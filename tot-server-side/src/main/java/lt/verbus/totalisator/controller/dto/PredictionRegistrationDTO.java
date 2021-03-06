package lt.verbus.totalisator.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictionRegistrationDTO {
    private Long totalisatorId;

    private Long matchId;

    private Long userId;

    private Integer homeScore;

    private Integer awayScore;

}
