package lt.verbus.totalisator.domain.model;


import lombok.Getter;
import lombok.Setter;
import lt.verbus.totalisator.domain.entity.Prediction;

@Getter
@Setter
public class Payout {

    private Prediction prediction;

    private Integer pointsForAccurateWinner;

    private Integer pointsForAccurateGoalDifference;

    private Integer pointsForAccurateScore;

    private Integer pointsForAccurateGoals;

    private Integer smallDeviationPoints;

    private Integer penaltyForMissedGoals;

    private Integer award;


    public Payout() {
        pointsForAccurateWinner = 0;
        pointsForAccurateGoalDifference = 0;
        pointsForAccurateScore = 0;
        pointsForAccurateGoals = 0;
        smallDeviationPoints = 0;
        penaltyForMissedGoals = 0;
        award = 0;
    }
}
