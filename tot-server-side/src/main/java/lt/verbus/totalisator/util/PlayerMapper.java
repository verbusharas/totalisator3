package lt.verbus.totalisator.util;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.controller.dto.PlayerDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlayerMapper {

    public PlayerDTO convertUserEntityToPlayerDTO(User user) {
        PlayerDTO playerDTO = new PlayerDTO();
        BeanUtils.copyProperties(user, playerDTO);
        List<Long> totalisators = user.getTotalisators().stream().map(Totalisator::getId).collect(Collectors.toList());
        playerDTO.setTotalisators(totalisators);
        return playerDTO;
    }
}
