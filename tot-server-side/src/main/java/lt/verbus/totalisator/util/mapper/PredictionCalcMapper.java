package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.PredictionCalcDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import org.springframework.stereotype.Component;

@Component
public class PredictionCalcMapper {

    public PredictionCalcDTO mapEntityToCalcDTO(Prediction prediction) {

        return PredictionCalcDTO.builder()
                .totalisatorId(prediction.getMatch().getTotalisator().getId())
                .home(prediction.getHomeScore())
                .away(prediction.getAwayScore())
                .actualHome(prediction.getMatch().getHomeScore())
                .actualAway(prediction.getMatch().getAwayScore())
                .build();
    }

}
