package lt.verbus.totalisator.util;

import lt.verbus.totalisator.controller.dto.PredictionBasicDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import org.springframework.stereotype.Component;

@Component
public class PredictionBasicMapper {


    public PredictionBasicDTO mapEntityToBasicDTO(Prediction prediction) {

        return PredictionBasicDTO.builder()
                .userId(prediction.getUser().getId())
                .homeScore(prediction.getHomeScore())
                .awayScore(prediction.getAwayScore())
                .build();
    }



}
