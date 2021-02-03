package lt.verbus.totalisator.util;

import lt.verbus.totalisator.domain.entity.Totalisator;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TotalisatorMapper {

    private final PlayerMapper playerMapper;
    private final MatchMapper matchMapper;

    public TotalisatorMapper(PlayerMapper playerMapper, MatchMapper matchMapper) {
        this.playerMapper = playerMapper;
        this.matchMapper = matchMapper;
    }

    public TotalisatorDTO convertToDTO(Totalisator totalisator) {
        TotalisatorDTO totalisatorDTO = new TotalisatorDTO();
        totalisatorDTO.setId(totalisator.getId());
        totalisatorDTO.setTitle(totalisator.getTitle());
        if (totalisator.getPlayers() != null) {
            totalisatorDTO.setPlayers(totalisator
                    .getPlayers()
                    .stream()
                    .map(playerMapper::convertEntityToDTO)
                    .collect(Collectors.toList()));
        }
        totalisatorDTO.setManagerId(totalisator.getManager().getId());

        if (totalisator.getMatches() != null) {
            totalisatorDTO.setMatches(totalisator
                    .getMatches()
                    .stream()
                    .map(matchMapper::mapEntityToDTO)
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
