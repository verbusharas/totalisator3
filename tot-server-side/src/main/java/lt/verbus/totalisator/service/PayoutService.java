package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.PayoutDTO;
import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.model.Payout;
import lt.verbus.totalisator.util.PayoutMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static lt.verbus.totalisator.util.UpdateQualifier.hasFinished;

@Service
public class PayoutService {

    private final PredictionService predictionService;
    private final PayoutMapper payoutMapper;

    public PayoutService(PredictionService predictionService, PayoutMapper payoutMapper) {
        this.predictionService = predictionService;
        this.payoutMapper = payoutMapper;
    }

    public PayoutDTO calculatePayout(Prediction prediction) {

    Payout payout = new Payout();
    payout.setPrediction(prediction);

    Long totalisatorId =  prediction.getMatch().getTotalisator().getId();
    Object settings;

    Integer factualHomeScore = prediction.getMatch().getHomeScore();
    Integer factualAwayScore = prediction.getMatch().getAwayScore();

    Integer predictedHomeScore = prediction.getHomeScore();
    Integer predictedAwayScore = prediction.getAwayScore();

    int award = 0;

    if (factualHomeScore.equals(predictedHomeScore) && factualAwayScore.equals(predictedAwayScore)) {
        award = 1000;
    }

    payout.setAward(award);

    return payoutMapper.mapModelToDTO(payout);
}

    public List<PayoutDTO> calculateAllByMatchId(Long matchId) {
        List<Prediction> predictions = predictionService.findByMatchId(matchId);
        return predictions.stream().map(this::calculatePayout).collect(Collectors.toList());
    }

}
