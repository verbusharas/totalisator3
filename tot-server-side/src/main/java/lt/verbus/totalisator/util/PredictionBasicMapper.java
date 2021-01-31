package lt.verbus.totalisator.util;

import lt.verbus.totalisator.controller.dto.PredictionBasicDTO;
import lt.verbus.totalisator.controller.dto.PredictionDTO;
import lt.verbus.totalisator.entity.Prediction;
import org.springframework.beans.BeanUtils;
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
