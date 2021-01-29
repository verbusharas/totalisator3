package lt.verbus.totalisator.util;

import lt.verbus.totalisator.controller.dto.TotalisatorBasicDTO;
import lt.verbus.totalisator.entity.Totalisator;
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
