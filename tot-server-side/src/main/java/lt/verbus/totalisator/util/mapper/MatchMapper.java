package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.PredictionBasicDTO;
import lt.verbus.totalisator.domain.entity.Match;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MatchMapper {

    private final PredictionBasicMapper predictionBasicMapper;

    public MatchMapper(PredictionBasicMapper predictionBasicMapper) {
        this.predictionBasicMapper = predictionBasicMapper;
    }

    public MatchDTO mapEntityToDTO(Match match) {
        MatchDTO matchDTO = new MatchDTO();
        BeanUtils.copyProperties(match, matchDTO);
        Long totalisatorId = match.getTotalisator().getId();
        matchDTO.setTotalisatorId(totalisatorId);
        if (match.getPredictions() != null) {
            List<PredictionBasicDTO> predictions = match.getPredictions()
                    .stream()
                    .map(predictionBasicMapper::mapEntityToBasicDTO)
                    .collect(Collectors.toList());
            matchDTO.setPredictions(predictions);
        } else matchDTO.setPredictions(new ArrayList<>());

        return matchDTO;
    }

    public Match convertMatchDTOtoEntity(MatchDTO matchDTO) {
        Match match = new Match();
        BeanUtils.copyProperties(matchDTO, match);
        return match;
    }

}
