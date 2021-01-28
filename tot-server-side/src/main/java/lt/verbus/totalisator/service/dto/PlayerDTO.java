package lt.verbus.totalisator.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PlayerDTO {

    private Long id;

    private String name;

    private List<Long> totalisators;

}
