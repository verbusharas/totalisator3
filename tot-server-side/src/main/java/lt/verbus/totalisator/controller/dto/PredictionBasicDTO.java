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
public class PredictionBasicDTO {

    private Long userId;

    private Integer homeScore;

    private Integer awayScore;

}
