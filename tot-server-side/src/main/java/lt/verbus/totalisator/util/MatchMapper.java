package lt.verbus.totalisator.util;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.PlayerDTO;
import lt.verbus.totalisator.controller.dto.TotalisatorBasicDTO;
import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class MatchMapper {

    public MatchDTO convertMatchEntityToMatchDTO(Match match) {
        MatchDTO matchDTO = new MatchDTO();
        BeanUtils.copyProperties(match, matchDTO);
        Long totalisatorId = match.getTotalisator().getId();
        matchDTO.setTotalisatorId(totalisatorId);
        return matchDTO;
    }

    public Match convertMatchDTOtoEntity(MatchDTO matchDTO) {
        Match match = new Match();
        BeanUtils.copyProperties(matchDTO, match);
        return match;
    }

}
