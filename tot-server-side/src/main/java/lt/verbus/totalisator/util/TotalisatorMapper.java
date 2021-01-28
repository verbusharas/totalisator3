package lt.verbus.totalisator.util;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.service.dto.TotalisatorDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TotalisatorMapper {

    private final PlayerMapper playerMapper;

    public TotalisatorMapper(PlayerMapper playerMapper) {
        this.playerMapper = playerMapper;
    }

    public TotalisatorDTO convertTotalisatorEntityToDTO(Totalisator totalisator) {
        TotalisatorDTO totalisatorDTO = new TotalisatorDTO();
        totalisatorDTO.setId(totalisator.getId());
        totalisatorDTO.setTitle(totalisator.getTitle());
        if (totalisator.getPlayers() != null) {
            totalisatorDTO.setPlayers(totalisator
                    .getPlayers()
                    .stream()
                    .map(playerMapper::convertUserEntityToPlayerDTO)
                    .collect(Collectors.toList()));
        }
        return totalisatorDTO;
    }

    public Totalisator convertTotalisatorDTOtoEntity(TotalisatorDTO totalisatorDTO) {
        Totalisator totalisator = new Totalisator();
        BeanUtils.copyProperties(totalisatorDTO, totalisator);
        return totalisator;
    }

}
