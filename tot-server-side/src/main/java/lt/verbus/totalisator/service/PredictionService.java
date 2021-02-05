package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.PredictionRegistrationDTO;
import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.exception.EntityNotFoundException;
import lt.verbus.totalisator.repository.PredictionRepository;
import lt.verbus.totalisator.util.UpdateQualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PredictionService {

    @Value("${minutes.to.match.when.start.monitoring}")
    private String MINUTES_TO_MATCH_WHEN_START_MONITORING;

    @Value("${prediction.default.away}")
    public Integer DEFAULT_AWAY_PREDICTION;

    @Value("${prediction.default.home}")
    public Integer DEFAULT_HOME_PREDICTION;

    private final PredictionRepository predictionRepository;
    private final MatchService matchService;
    private final UserService userService;
    private UpdateService updateService;
    private final UpdateQualifier updateQualifier;


    public PredictionService(PredictionRepository predictionRepository,
                             MatchService matchService,
                             UserService userService, UpdateQualifier updateQualifier) {
        this.predictionRepository = predictionRepository;
        this.matchService = matchService;
        this.userService = userService;
        this.updateQualifier = updateQualifier;
    }


    public Prediction findByMatchIdPlayerId(Long matchId, Long playerId) {
        return predictionRepository.findByMatchIdAndPlayerId(matchId, playerId).orElseThrow(()->new EntityNotFoundException("Prediction was not found"));
    }

    public List<Prediction> findByMatchId(Long matchId) {
        return predictionRepository.findAllByMatchId(matchId);
    }

    public List<Prediction> findByTotalisatorId(Long totalisatorId) {
        return predictionRepository.findAllByTotalisatorId(totalisatorId);
    }

    public List<MatchDTO> savePredictionAndGetUpdatedPendingList(PredictionRegistrationDTO predictionRegistrationDTO, User user) {
        Match match = matchService.getById(predictionRegistrationDTO.getMatchId());
        match = updateService.updateIfMonitored(match);
        if(!updateQualifier.hasStarted(match)) {
            Prediction prediction =
                    Prediction.builder()
                            .match(match)
                            .user(userService.getById(user.getId()))
                            .homeScore(predictionRegistrationDTO.getHomeScore())
                            .awayScore(predictionRegistrationDTO.getAwayScore())
                            .build();
            match.getPredictions().add(prediction);
            matchService.save(match);
        }
        return  matchService.getPendingByUserAndTotalisatorId(match.getTotalisator().getId(), user.getId());
    }

    public Match defaultMissingIfDue(Match match) {
        if (updateQualifier.hasStarted(match)) {
            List<Prediction> predictions = match.getPredictions();
            if (predictions == null) {
                predictions = new ArrayList<>();
            }
            List<User> allPlayers = match.getTotalisator().getPlayers();

            List<User> predictedPlayers = predictions.stream()
                    .map(Prediction::getUser)
                    .collect(Collectors.toList());

            List<User> latePlayers = allPlayers.stream()
                    .filter(p->!predictedPlayers.contains(p))
                    .collect(Collectors.toList());

            latePlayers.forEach(player-> {
                match.getPredictions().add(Prediction.builder()
                        .match(match)
                        .awayScore(DEFAULT_AWAY_PREDICTION)
                        .homeScore(DEFAULT_HOME_PREDICTION)
                        .user(player)
                        .build());
            });
        }
        return match;
    }

    @Autowired
    public void setUpdateService(UpdateService updateService) {
        this.updateService = updateService;
    }

}
