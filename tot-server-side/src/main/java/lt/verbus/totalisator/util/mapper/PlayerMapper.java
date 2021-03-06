package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.TotalisatorBasicDTO;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.controller.dto.PlayerDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlayerMapper {

    private final TotalisatorBasicMapper totalisatorBasicMapper;

    public PlayerMapper(TotalisatorBasicMapper totalisatorBasicMapper) {
        this.totalisatorBasicMapper = totalisatorBasicMapper;
    }

    public PlayerDTO convertEntityToDTO(User user) {
        PlayerDTO playerDTO = new PlayerDTO();
        BeanUtils.copyProperties(user, playerDTO);
        List<TotalisatorBasicDTO> totalisators = user
                .getTotalisators()
                .stream()
                .map(totalisatorBasicMapper::convertTotalisatorEntityToBasicDTO)
                .collect(Collectors.toList());
        playerDTO.setTotalisators(totalisators);
        return playerDTO;
    }
}
