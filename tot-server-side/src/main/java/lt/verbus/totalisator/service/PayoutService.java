package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.PayoutDTO;
import lt.verbus.totalisator.controller.dto.PredictionCalcDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.Settings;
import lt.verbus.totalisator.domain.model.Payout;
import lt.verbus.totalisator.util.mapper.PayoutMapper;
import lt.verbus.totalisator.util.mapper.PredictionCalcMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PayoutService {

    private final PredictionService predictionService;
    private final PayoutMapper payoutMapper;
    private final PredictionCalcMapper predictionCalcMapper;
    private final SettingsService settingsService;

    public PayoutService(PredictionService predictionService, PayoutMapper payoutMapper, PredictionCalcMapper predictionCalcMapper, SettingsService settingsService) {
        this.predictionService = predictionService;
        this.payoutMapper = payoutMapper;
        this.predictionCalcMapper = predictionCalcMapper;
        this.settingsService = settingsService;
    }

    public PayoutDTO calculateByMatchAndUser(Long matchId, Long userId) {
        Prediction prediction = predictionService.findByMatchIdPlayerId(matchId, userId);
        return getPayoutByPrediction(prediction);
    }

    public List<PayoutDTO> calculateByMatch(Long matchId) {
        List<Prediction> predictions = predictionService.findByMatchId(matchId);
        return predictions.stream().map(this::getPayoutByPrediction).collect(Collectors.toList());
    }

    public List<PayoutDTO> calculateByTotalisator(Long totalisatorId) {
        List<Prediction> predictions = predictionService.findByTotalisatorId(totalisatorId);
        List<PayoutDTO> payouts = predictions.stream().filter(this::hasFinalScore).map(this::getPayoutByPrediction).collect(Collectors.toList());
        return payouts;
    }

    private boolean hasFinalScore(Prediction p) {
        return p.getMatch().getHomeScore() != null && p.getMatch().getAwayScore() != null;
    }

    protected PayoutDTO getPayoutByPrediction(Prediction predictionEntity) {
        PredictionCalcDTO predictionCalcDTO = predictionCalcMapper.mapEntityToCalcDTO(predictionEntity);
        Payout payout = new Payout();
        payout.setPrediction(predictionEntity);
        payout.setAward(calculateAwards(predictionCalcDTO));
        return payoutMapper.mapModelToDTO(payout);
    }

    protected Integer calculateAwards (PredictionCalcDTO prediction) {
        Settings settings = settingsService.findByTotalisatorId(prediction.getTotalisatorId());
        int totalAward = 0;

        if (hasAccurateWinner(prediction)) {
            totalAward += settings.getPointsForAccurateWinner();
        }
        if (hasAccurateDiff(prediction)) {
            totalAward += settings.getPointsForAccurateGoalDifference();
        }
        if (hasAccurateScore(prediction)) {
            totalAward += settings.getPointsForAccurateScore();
        }

        totalAward += getAwardForAccurateGoals(prediction, settings);
        totalAward += getAwardForSmallDeviation(prediction, settings);

        return totalAward;
    }

    protected boolean hasAccurateWinner(PredictionCalcDTO prediction) {
        boolean hasPredictedHomeWin = prediction.getHome() > prediction.getAway() && prediction.getActualHome() > prediction.getActualAway();
        boolean hasPredictedAwayWin = prediction.getHome() < prediction.getAway() && prediction.getActualHome() < prediction.getActualAway();
        boolean hasPredictedDraw = prediction.getHome().equals(prediction.getAway()) && prediction.getActualHome().equals(prediction.getActualAway());
        return (hasPredictedHomeWin || hasPredictedAwayWin || hasPredictedDraw);
    }

    protected boolean hasAccurateDiff(PredictionCalcDTO prediction) {
        return prediction.getHome() - prediction.getAway() == prediction.getActualHome() - prediction.getActualAway();
    }

    protected boolean hasAccurateScore(PredictionCalcDTO prediction) {
        return prediction.getHome().equals(prediction.getActualHome()) && prediction.getAway().equals(prediction.getActualAway());
    }

    protected int getAwardForSmallDeviation(PredictionCalcDTO prediction, Settings settings) {
        int smallGoalDeviationPoints = settings.getPointsForNoGoalDeviation() - calculateMissedGoals(prediction) * settings.getPenaltyForMissedGoal();
        return settings.getCanGetNegativePoints() ? smallGoalDeviationPoints : Math.max(smallGoalDeviationPoints, 0);
    }

    protected int getAwardForAccurateGoals(PredictionCalcDTO prediction, Settings settings) {
        return calculateAccurateGoals(prediction) * settings.getPointsForEachAccurateGoal();
    }

    protected int calculateAccurateGoals(PredictionCalcDTO prediction) {
        int accurateGoalCount = 0;

        int homeDiff = prediction.getActualHome() - prediction.getHome();
        if (homeDiff >= 0) {
            accurateGoalCount += prediction.getHome();
        } else {
            accurateGoalCount += prediction.getActualHome();
        }

        int awayDiff = prediction.getActualAway() - prediction.getAway();
        if (awayDiff >= 0) {
            accurateGoalCount += prediction.getAway();
        } else {
            accurateGoalCount += prediction.getActualAway();
        }
        return accurateGoalCount;
    }

    protected  int calculateMissedGoals(PredictionCalcDTO prediction) {
        int homeDeviation = Math.abs(prediction.getHome() - prediction.getActualHome());
        int awayDeviation = Math.abs(prediction.getAway() - prediction.getActualAway());
        return homeDeviation + awayDeviation;
    }

}
