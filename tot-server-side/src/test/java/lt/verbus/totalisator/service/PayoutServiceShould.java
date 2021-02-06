package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.Settings;
import lt.verbus.totalisator.util.PredictionCalcMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PayoutServiceShould {

    private final Match MATCH_0_0 = Match.builder().homeScore(0).awayScore(0).build();
    private final Match MATCH_1_0 = Match.builder().homeScore(1).awayScore(0).build();
    private final Match MATCH_0_2 = Match.builder().homeScore(0).awayScore(2).build();
    private final Match MATCH_2_4 = Match.builder().homeScore(2).awayScore(4).build();
    private final Match MATCH_3_3 = Match.builder().homeScore(3).awayScore(3).build();
    private final Match MATCH_4_0 = Match.builder().homeScore(4).awayScore(0).build();
    private final Match MATCH_2_2 = Match.builder().homeScore(2).awayScore(2).build();
    private final Match MATCH_5_4 = Match.builder().homeScore(5).awayScore(4).build();
    private final Prediction PREDICTION_4_2 = Prediction.builder().homeScore(4).awayScore(2).build();
    private final Prediction PREDICTION_4_3 = Prediction.builder().homeScore(4).awayScore(3).build();
    private final Prediction PREDICTION_5_7 = Prediction.builder().homeScore(5).awayScore(7).build();
    private final Prediction PREDICTION_5_3 = Prediction.builder().homeScore(5).awayScore(3).build();
    private final Prediction PREDICTION_3_3 = Prediction.builder().homeScore(3).awayScore(3).build();
    private final Prediction PREDICTION_2_3 = Prediction.builder().homeScore(2).awayScore(3).build();
    private final Prediction PREDICTION_2_4 = Prediction.builder().homeScore(2).awayScore(4).build();
    private final Prediction PREDICTION_1_1 = Prediction.builder().homeScore(1).awayScore(1).build();
    private final Prediction PREDICTION_0_2 = Prediction.builder().homeScore(0).awayScore(2).build();
    private final Prediction PREDICTION_0_0 = Prediction.builder().homeScore(0).awayScore(0).build();
    private final Prediction PREDICTION_0_1 = Prediction.builder().homeScore(0).awayScore(1).build();

    private final SettingsService settingsService = Mockito.mock(SettingsService.class);

    private final Settings SETTINGS = Settings.builder()
            .pointsForAccurateScore(50)
            .pointsForAccurateGoalDifference(50)
            .pointsForAccurateWinner(25)
            .pointsForNoGoalDeviation(25)
            .penaltyForMissedGoal(5)
            .pointsForEachAccurateGoal(5)
            .canGetNegativePoints(false)
            .build();

    @InjectMocks
    private PayoutService payoutService;

    @InjectMocks
    private PredictionCalcMapper predCalcMapper;

    @BeforeEach
    void init() {

        when(settingsService.findByTotalisatorId(any())).thenReturn(SETTINGS);
    }

    @Test
    void return_true_when_passed_prediction_with_home_win_and_match_ended_as_home_win() {
        // given
        Prediction homeWinPrediction = PREDICTION_4_2;
        // when
        homeWinPrediction.setMatch(MATCH_1_0);
        // then
        Assertions.assertTrue(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        homeWinPrediction)));
    }

    @Test
    void return_false_when_passed_prediction_with_away_win_or_draw_but_match_ended_as_home_win() {
        // given
        Prediction awayWinPrediction = PREDICTION_2_3;
        Prediction drawPrediction = PREDICTION_1_1;

        // when
        awayWinPrediction.setMatch(MATCH_1_0);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        awayWinPrediction)));

        // when
        drawPrediction.setMatch(MATCH_1_0);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        drawPrediction)));
    }

    @Test
    void return_true_when_passed_prediction_with_away_win_and_match_ended_as_away_win() {
        //given
        Prediction awayWinPrediction = PREDICTION_2_3;

        // when
        awayWinPrediction.setMatch(MATCH_0_2);
        // then
        Assertions.assertTrue(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        awayWinPrediction)));
    }

    @Test
    void return_false_when_passed_prediction_with_home_win_or_draw_but_match_ended_as_away_win() {
        //given
        Prediction homeWinPrediction = PREDICTION_4_2;
        Prediction drawPrediction = PREDICTION_1_1;

        // when
        homeWinPrediction.setMatch(MATCH_0_2);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        homeWinPrediction)));

        // when
        drawPrediction.setMatch(MATCH_0_2);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        drawPrediction)));
    }

    @Test
    void return_true_when_passed_prediction_with_draw_score_and_match_ended_as_draw() {
        //given
        Prediction drawPrediction = PREDICTION_1_1;

        // when
        drawPrediction.setMatch(MATCH_3_3);
        // then
        Assertions.assertTrue(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        drawPrediction)));
    }

    @Test
    void return_false_when_passed_prediction_with_home_win_or_away_win_but_match_ended_as_draw() {
        //given
        Prediction homeWinPrediction = PREDICTION_4_2;
        Prediction awayWinPrediction = PREDICTION_2_3;

        // when
        homeWinPrediction.setMatch(MATCH_3_3);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        homeWinPrediction)));

        // when
        awayWinPrediction.setMatch(MATCH_3_3);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        awayWinPrediction)));
    }

    @Test
    void return_true_when_passed_prediction_with_accurate_goal_difference(){
        //given
        Prediction prediction2Against4 = PREDICTION_2_4;
        Prediction prediction0Against2 = PREDICTION_0_2;

        // when
        prediction2Against4.setMatch(MATCH_0_2);
        // then
        Assertions.assertTrue(payoutService.hasAccurateDiff(
                predCalcMapper.mapEntityToCalcDTO(
                        prediction2Against4)));

        // when
        prediction0Against2.setMatch(MATCH_0_2);
        // then
        Assertions.assertTrue(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        prediction0Against2)));
    }

    @Test
    void return_false_when_passed_prediction_with_not_accurate_goal_difference(){
        //given
        Prediction predictionDiff2 = PREDICTION_4_2;

        // when
        predictionDiff2.setMatch(MATCH_0_2);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        predictionDiff2)));
    }

    @Test
    void return_true_when_passed_prediction_with_accurate_score(){
        //given
        Prediction prediction2Against4 = PREDICTION_2_4;
        Prediction prediction3Against3 = PREDICTION_3_3;

        // when
        prediction2Against4.setMatch(MATCH_2_4);
        // then
        Assertions.assertTrue(payoutService.hasAccurateDiff(
                predCalcMapper.mapEntityToCalcDTO(
                        prediction2Against4)));

        // when
        prediction3Against3.setMatch(MATCH_3_3);
        // then
        Assertions.assertTrue(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        prediction3Against3)));

    }

    @Test
    void return_false_when_passed_prediction_with_not_accurate_score(){
        //given
        Prediction prediction3Against3 = PREDICTION_3_3;
        // when
        prediction3Against3.setMatch(MATCH_2_4);
        // then
        Assertions.assertFalse(payoutService.hasAccurateWinner(
                predCalcMapper.mapEntityToCalcDTO(
                        prediction3Against3)));
    }

    @Test
    void return_25_small_deviation_points_when_0_goals_missed(){
        //given
        Prediction prediction2Against4 = PREDICTION_2_4;
        Settings settings = SETTINGS;
        // when
        prediction2Against4.setMatch(MATCH_2_4);
        // then
        Assertions.assertEquals(settings.getPointsForNoGoalDeviation(),
                payoutService.getAwardForSmallDeviation(
                        predCalcMapper.mapEntityToCalcDTO(prediction2Against4), settings));
    }

    @Test
    void return_10_small_deviation_points_when_3_goals_missed(){
        //given
        Prediction predictionWithDeviation3 = PREDICTION_4_3;
        Settings settings = SETTINGS;
        // when
        predictionWithDeviation3.setMatch(MATCH_2_4);

        // then
        Assertions.assertEquals(10,
                payoutService.getAwardForSmallDeviation(
                        predCalcMapper.mapEntityToCalcDTO(predictionWithDeviation3), settings));
    }

    @Test
    void return_0_small_deviation_points_when_more_than_5_goals_missed_and_settings_canGetNegative_false(){
        //given
        Prediction predictionWithDeviation6 = PREDICTION_4_3;
        Prediction predictionWithDeviation11 = PREDICTION_5_7;
        // when
        predictionWithDeviation6.setMatch(MATCH_1_0);
        predictionWithDeviation11.setMatch(MATCH_1_0);

        Settings settings = SETTINGS;


        // then
        Assertions.assertEquals(0,
                payoutService.getAwardForSmallDeviation(
                        predCalcMapper.mapEntityToCalcDTO(predictionWithDeviation6), settings));

        Assertions.assertEquals(0,
                payoutService.getAwardForSmallDeviation(
                        predCalcMapper.mapEntityToCalcDTO(predictionWithDeviation11), settings));
    }

    @Test
    void return_negative_small_deviation_points_when_more_than_5_goals_missed_and_settings_canGetNegative_true(){
        //given
        Prediction predictionWithDeviation6 = PREDICTION_4_3;
        Prediction predictionWithDeviation11 = PREDICTION_5_7;
        // when
        predictionWithDeviation6.setMatch(MATCH_1_0);
        predictionWithDeviation11.setMatch(MATCH_1_0);

        Settings settings = SETTINGS;
        settings.setCanGetNegativePoints(true);

        // then
        Assertions.assertEquals(-5,
                payoutService.getAwardForSmallDeviation(
                        predCalcMapper.mapEntityToCalcDTO(predictionWithDeviation6), settings));

        Assertions.assertEquals(-30,
                payoutService.getAwardForSmallDeviation(
                        predCalcMapper.mapEntityToCalcDTO(predictionWithDeviation11), settings));
    }

    @Test
    void return_20_accurate_goal_points_when_4_goals_accurate(){
        //given
        Prediction prediction4Against2 = PREDICTION_4_2;
        Prediction prediction5Against3 = PREDICTION_5_3;
        // when
        prediction4Against2.setMatch(MATCH_4_0);
        prediction5Against3.setMatch(MATCH_2_2);
        // then
        Assertions.assertEquals(20,
                payoutService.getAwardForAccurateGoals(
                        predCalcMapper.mapEntityToCalcDTO(prediction4Against2), SETTINGS));

        Assertions.assertEquals(20,
                payoutService.getAwardForAccurateGoals(
                        predCalcMapper.mapEntityToCalcDTO(prediction5Against3), SETTINGS));
    }

    @Test
    void return_60_points_award_when_predicted_4_2_and_actual_was_4_0(){
        //given
        Prediction prediction4Against2 = PREDICTION_4_2;
        // when
        prediction4Against2.setMatch(MATCH_4_0);
        // then
        Assertions.assertEquals(60,
                payoutService.calculateAwards(predCalcMapper.mapEntityToCalcDTO(prediction4Against2)));

    }

    @Test
    void return_150_points_award_when_predicted_0_0_and_actual_was_0_0(){
        //given
        Prediction prediction0Against0 = PREDICTION_0_0;
        // when
        prediction0Against0.setMatch(MATCH_0_0);
        // then
        Assertions.assertEquals(150,
                payoutService.calculateAwards(predCalcMapper.mapEntityToCalcDTO(prediction0Against0)));

    }

    @Test
    void return_180_points_award_when_predicted_3_2_and_actual_was_3_2(){
        //given
        Prediction prediction0Against0 = PREDICTION_2_4;
        // when
        prediction0Against0.setMatch(MATCH_2_4);
        // then
        Assertions.assertEquals(180,
                payoutService.calculateAwards(predCalcMapper.mapEntityToCalcDTO(prediction0Against0)));

    }

    @Test
    void return_0_points_award_when_predicted_0_0_and_actual_was_2_4_when_settings_canGetNegativePoints_false(){
        //given
        Prediction prediction0Against0 = PREDICTION_0_0;
        // when
        prediction0Against0.setMatch(MATCH_2_4);
        // then
        Assertions.assertEquals(0,
                payoutService.calculateAwards(predCalcMapper.mapEntityToCalcDTO(prediction0Against0)));

    }

    @Test
    void return_minus5_points_award_when_predicted_0_0_and_actual_was_2_4_when_settings_canGetNegativePoints_true(){
        //given
        Prediction prediction0Against0 = PREDICTION_0_0;
        Settings settings = SETTINGS;
        settings.setCanGetNegativePoints(true);
        when(settingsService.findByTotalisatorId(any())).thenReturn(settings);
        // when
        prediction0Against0.setMatch(MATCH_2_4);
        // then
        Assertions.assertEquals(-5,
                payoutService.calculateAwards(predCalcMapper.mapEntityToCalcDTO(prediction0Against0)));

    }

    @Test
    void return_minus10points_award_when_predicted_0_1_and_actual_was_5_4_when_settings_canGetNegativePoints_true(){
        //given
        Prediction prediction0Against0 = PREDICTION_0_1;
        Settings settings = SETTINGS;
        settings.setCanGetNegativePoints(true);
        when(settingsService.findByTotalisatorId(any())).thenReturn(settings);
        // when
        prediction0Against0.setMatch(MATCH_5_4);
        // then
        Assertions.assertEquals(-10,
                payoutService.calculateAwards(predCalcMapper.mapEntityToCalcDTO(prediction0Against0)));

    }



}