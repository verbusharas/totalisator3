package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.PayoutDTO;
import lt.verbus.totalisator.controller.dto.PredictionCalcDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.Settings;
import lt.verbus.totalisator.domain.model.Payout;
import lt.verbus.totalisator.util.mapper.PayoutMapper;
import lt.verbus.totalisator.util.mapper.PredictionCalcMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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
        return predictions.stream().filter(this::hasFinalScore).map(this::getPayoutByPrediction).collect(Collectors.toList());
    }

    public List<PayoutDTO> calculateSamplePayouts(PredictionCalcDTO prediction) {
        List<PayoutDTO> samplePayouts = new ArrayList<>();
        for (int h = 0; h<=5; h++) {
            for (int a = 0; a<=5; a++) {
                prediction.setHome(h);
                prediction.setAway(a);
                samplePayouts.add(getSamplePayout(prediction));
            }
        }
        samplePayouts.sort(Collections.reverseOrder());
        return samplePayouts;
    }

    private boolean hasFinalScore(Prediction p) {
        return p.getMatch().getHomeScore() != null && p.getMatch().getAwayScore() != null;
    }

    protected PayoutDTO getPayoutByPrediction(Prediction predictionEntity) {
        PredictionCalcDTO predictionCalcDTO = predictionCalcMapper.mapEntityToCalcDTO(predictionEntity);
        Payout payout = calculateAwards(predictionCalcDTO);
        payout.setPrediction(predictionEntity);
        return payoutMapper.mapModelToDTO(payout);
    }

    protected PayoutDTO getSamplePayout(PredictionCalcDTO prediction) {
        Payout payout = calculateAwards(prediction);
        //FIXME: review DTOs and mappers to refactor this builder
        return PayoutDTO.builder()
                .homeScoreActual(prediction.getActualHome())
                .awayScoreActual(prediction.getActualAway())
                .homeScorePrediction(prediction.getHome())
                .awayScorePrediction(prediction.getAway())
                .pointsForAccurateWinner(payout.getPointsForAccurateWinner())
                .pointsForAccurateGoalDifference(payout.getPointsForAccurateGoalDifference())
                .pointsForAccurateScore(payout.getPointsForAccurateScore())
                .pointsForAccurateGoals(payout.getPointsForAccurateGoals())
                .pointsForAccuracy(payout.getSmallDeviationPoints())
                .penaltyForMissedGoals(payout.getPenaltyForMissedGoals())
                .award(payout.getAward())
                .build();
    }

    protected Payout calculateAwards (PredictionCalcDTO prediction) {
        Settings settings = settingsService.findByTotalisatorId(prediction.getTotalisatorId());

        Payout payout = new Payout();

        int totalAward = 0;

        if (hasAccurateWinner(prediction)) {
            payout.setPointsForAccurateWinner(settings.getPointsForAccurateWinner());
            totalAward += payout.getPointsForAccurateWinner();
        }
        if (hasAccurateDiff(prediction)) {
            payout.setPointsForAccurateGoalDifference(settings.getPointsForAccurateGoalDifference());
            totalAward += payout.getPointsForAccurateGoalDifference();
        }
        if (hasAccurateScore(prediction)) {
            payout.setPointsForAccurateScore(settings.getPointsForAccurateScore());
            totalAward += payout.getPointsForAccurateScore();
        }

        payout.setPointsForAccurateGoals(getAwardForAccurateGoals(prediction, settings));
        totalAward += payout.getPointsForAccurateGoals();

        int maxDeviationAward = settings.getPointsForNoGoalDeviation();
        int deviationAward = getAwardForSmallDeviation(prediction, settings);

        payout.setSmallDeviationPoints(settings.getPointsForNoGoalDeviation());
        payout.setPenaltyForMissedGoals(deviationAward - maxDeviationAward);

        totalAward += deviationAward;

        payout.setAward(totalAward);

        return payout;
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
