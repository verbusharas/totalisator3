package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.PredictionBasicDTO;
import lt.verbus.totalisator.controller.dto.PredictionDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class PredictionMapper {

    private final UserMapper userMapper;
    private final MatchMapper matchMapper;

    public PredictionMapper(UserMapper userMapper, MatchMapper matchMapper) {
        this.userMapper = userMapper;
        this.matchMapper = matchMapper;
    }


    public PredictionDTO mapEntityToDTO(Prediction prediction) {

        return PredictionDTO.builder()
                .id(prediction.getId())
                .user(userMapper.mapEntityToDTO(prediction.getUser()))
                .match(matchMapper.mapEntityToDTO(prediction.getMatch()))
                .homeScore(prediction.getHomeScore())
                .awayScore(prediction.getAwayScore())
                .build();
    }

    public PredictionBasicDTO mapEntityToBasicDTO(Prediction prediction) {

        return PredictionBasicDTO.builder()
                .userId(prediction.getUser().getId())
                .homeScore(prediction.getHomeScore())
                .awayScore(prediction.getAwayScore())
                .build();
    }

    public Prediction convertPredictionDTOtoEntity(PredictionDTO predictionDTO) {
        Prediction prediction = new Prediction();
        BeanUtils.copyProperties(predictionDTO, prediction);
        return prediction;
    }

}
