package lt.verbus.totalisator.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Totalisator totalisator;

    private Integer pointsForAccurateWinner;

    private Integer pointsForAccurateGoalDifference;

    private Integer pointsForAccurateScore;

    private Integer pointsForEachAccurateGoal;

    private Integer pointsForNoGoalDeviation;

    private Integer penaltyForMissedGoal;

    private Boolean canGetNegativePoints;

}
