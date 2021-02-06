package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.TotalisatorBasicDTO;
import lt.verbus.totalisator.domain.entity.Totalisator;
import org.springframework.stereotype.Component;

@Component
public class TotalisatorBasicMapper {

    public TotalisatorBasicDTO convertTotalisatorEntityToBasicDTO(Totalisator totalisator) {
        TotalisatorBasicDTO totalisatorBasicDTO = new TotalisatorBasicDTO();
        totalisatorBasicDTO.setId(totalisator.getId());
        totalisatorBasicDTO.setTitle(totalisator.getTitle());
        return totalisatorBasicDTO;
    }

}
