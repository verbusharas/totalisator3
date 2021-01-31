package lt.verbus.totalisator.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionDTO {

    private Long id;

    private UserDTO user;

    private MatchDTO match;

    private Byte homeScore;

    private Byte awayScore;

    private Float accuracy;

}
