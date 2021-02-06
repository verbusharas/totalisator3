package lt.verbus.totalisator.util;

import lt.verbus.totalisator.controller.dto.PredictionCalcDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import org.springframework.stereotype.Component;

@Component
public class PredictionCalcMapper {

    public PredictionCalcDTO mapEntityToCalcDTO(Prediction prediction) {

        return PredictionCalcDTO.builder()
                .home(prediction.getHomeScore())
                .away(prediction.getAwayScore())
                .actualHome(prediction.getMatch().getHomeScore())
                .actualAway(prediction.getMatch().getAwayScore())
                .build();
    }
}
