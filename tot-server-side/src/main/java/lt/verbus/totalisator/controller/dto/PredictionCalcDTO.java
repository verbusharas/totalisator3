package lt.verbus.totalisator.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionCalcDTO {

    private Long totalisatorId;

    private Integer home;

    private Integer away;

    private Integer actualHome;

    private Integer actualAway;
}
