package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.PredictionRegistrationDTO;
import lt.verbus.totalisator.controller.dto.PredictionDTO;
import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.exception.EntityNotFoundException;
import lt.verbus.totalisator.repository.PredictionRepository;
import lt.verbus.totalisator.util.PredictionMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static lt.verbus.totalisator.util.UpdateQualifier.hasStarted;

@Service
public class PredictionService {


    public static final int DEFAULT_AWAY_PREDICTION = 0;
    public static final int DEFAULT_HOME_PREDICTION = 0;
    private final PredictionRepository predictionRepository;
    private final MatchService matchService;
    private final UserService userService;
    private final PredictionMapper predictionMapper;


    public PredictionService(PredictionRepository predictionRepository,
                             MatchService matchService,
                             UserService userService,
                             PredictionMapper predictionMapper) {
        this.predictionRepository = predictionRepository;
        this.matchService = matchService;
        this.userService = userService;
        this.predictionMapper = predictionMapper;
    }

    public Prediction findById(Long id) {
        return predictionRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Prediction was not found"));
    }

    public Prediction findByMatchIdPlayerId(Long matchId, Long playerId) {
        return predictionRepository.findByMatchIdAndPlayerId(matchId, playerId).orElseThrow(()->new EntityNotFoundException("Prediction was not found"));
    }


    public PredictionDTO savePrediction(PredictionRegistrationDTO predictionRegistrationDTO) {
        Prediction prediction =
                Prediction.builder()
                .match(matchService.getById(predictionRegistrationDTO.getMatchId()))
                .user(userService.getById(predictionRegistrationDTO.getUserId()))
                .homeScore(predictionRegistrationDTO.getHomeScore())
                .awayScore(predictionRegistrationDTO.getAwayScore())
                .build();
        Prediction savedPrediction = predictionRepository.save(prediction);
        return predictionMapper.mapEntityToDTO(savedPrediction);
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


    public List<Prediction> findByMatchId(Long matchId) {
        return predictionRepository.findAllByMatchId(matchId);
    }
}
