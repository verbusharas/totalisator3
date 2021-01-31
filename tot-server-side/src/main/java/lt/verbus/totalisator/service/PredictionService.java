package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.PredictionRegistrationDTO;
import lt.verbus.totalisator.controller.dto.PredictionDTO;
import lt.verbus.totalisator.entity.Prediction;
import lt.verbus.totalisator.repository.PredictionRepository;
import lt.verbus.totalisator.util.PredictionMapper;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {


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

}
