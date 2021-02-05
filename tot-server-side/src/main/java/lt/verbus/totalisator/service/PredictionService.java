package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.PredictionRegistrationDTO;
import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.exception.EntityNotFoundException;
import lt.verbus.totalisator.repository.PredictionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static lt.verbus.totalisator.util.UpdateQualifier.hasStarted;

@Service
public class PredictionService {


    @Value("${default.away.prediction}")
    public int DEFAULT_AWAY_PREDICTION;

    @Value("${default.home.prediction}")
    public int DEFAULT_HOME_PREDICTION;

    private final PredictionRepository predictionRepository;
    private final MatchService matchService;
    private final UserService userService;


    public PredictionService(PredictionRepository predictionRepository,
                             MatchService matchService,
                             UserService userService) {
        this.predictionRepository = predictionRepository;
        this.matchService = matchService;
        this.userService = userService;
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

    public List<MatchDTO> savePredictionAndGetUpdatedPendingList(PredictionRegistrationDTO predictionRegistrationDTO) {
        Match match = matchService.getById(predictionRegistrationDTO.getMatchId());
        Prediction prediction =
                Prediction.builder()
                        .match(match)
                        .user(userService.getById(predictionRegistrationDTO.getUserId()))
                        .homeScore(predictionRegistrationDTO.getHomeScore())
                        .awayScore(predictionRegistrationDTO.getAwayScore())
                        .build();
        match.getPredictions().add(prediction);
        matchService.save(match);
        return  matchService.getPendingByUserAndTotalisatorId(match.getTotalisator().getId(), prediction.getUser().getId());
    }

    public Match defaultMissingIfDue(Match match) {
        if (hasStarted(match)) {
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
}
