package lt.verbus.totalisator.controller.dto;

import lombok.*;
import lt.verbus.totalisator.domain.entity.Prediction;

@Getter
@Setter
@Builder
public class PayoutDTO {

    private Long userId;

    private Long matchId;

    private Integer homeScorePrediction;

    private Integer awayScorePrediction;

    private Integer homeScoreActual;

    private Integer awayScoreActual;

    private Integer award;

}
