package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.PayoutDTO;
import lt.verbus.totalisator.domain.model.Payout;
import org.springframework.stereotype.Component;

@Component
public class PayoutMapper {


    public PayoutDTO mapModelToDTO(Payout payout) {

        return PayoutDTO.builder()
                .userId(payout.getPrediction().getUser().getId())
                .matchId(payout.getPrediction().getMatch().getEntityId())
                .homeScoreActual(payout.getPrediction().getMatch().getHomeScore())
                .awayScoreActual(payout.getPrediction().getMatch().getAwayScore())
                .homeScorePrediction(payout.getPrediction().getHomeScore())
                .awayScorePrediction(payout.getPrediction().getAwayScore())
                .award(payout.getAward())
                .build();
    }


}
