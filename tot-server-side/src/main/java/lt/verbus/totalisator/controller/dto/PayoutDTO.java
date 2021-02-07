package lt.verbus.totalisator.controller.dto;

import lombok.*;
import lt.verbus.totalisator.domain.entity.Prediction;

@Getter
@Setter
@Builder
public class PayoutDTO implements Comparable<PayoutDTO> {

    private Long userId;

    private Long matchId;

    private Integer homeScorePrediction;

    private Integer awayScorePrediction;

    private Integer homeScoreActual;

    private Integer awayScoreActual;

    private Integer pointsForAccurateWinner;

    private Integer pointsForAccurateGoalDifference;

    private Integer pointsForAccurateScore;

    private Integer pointsForAccurateGoals;

    private Integer pointsForAccuracy;

    private Integer penaltyForMissedGoals;

    private Integer award;


    @Override
    public int compareTo(PayoutDTO payoutDTO) {
        return this.award.compareTo(payoutDTO.award);
    }
}
