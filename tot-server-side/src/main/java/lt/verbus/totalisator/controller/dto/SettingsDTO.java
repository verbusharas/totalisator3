package lt.verbus.totalisator.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.verbus.totalisator.domain.entity.Totalisator;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingsDTO {

    private Long totalisatorId;

    private Integer pointsForAccurateWinner;

    private Integer pointsForAccurateGoalDifference;

    private Integer pointsForAccurateScore;

    private Integer pointsForEachAccurateGoal;

    private Integer pointsForNoGoalDeviation;

    private Integer penaltyForMissedGoal;

    private Boolean canGetNegativePoints;

}
