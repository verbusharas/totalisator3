package lt.verbus.totalisator.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TotalisatorDTO {

    private Long id;

    private String title;

    List<PlayerDTO> players;

}
