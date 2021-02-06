package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.controller.dto.SettingsDTO;
import lt.verbus.totalisator.domain.entity.Settings;
import org.springframework.stereotype.Component;

@Component
public class SettingsMapper {

    public SettingsDTO mapEntityToDTO(Settings settings) {
        return SettingsDTO.builder()
                .totalisatorId(settings.getTotalisator().getId())
                .pointsForAccurateScore(settings.getPointsForAccurateScore())
                .pointsForAccurateGoalDifference(settings.getPointsForAccurateGoalDifference())
                .pointsForAccurateWinner(settings.getPointsForAccurateWinner())
                .pointsForEachAccurateGoal(settings.getPointsForEachAccurateGoal())
                .pointsForNoGoalDeviation(settings.getPointsForNoGoalDeviation())
                .penaltyForMissedGoal(settings.getPenaltyForMissedGoal())
                .canGetNegativePoints(settings.getCanGetNegativePoints())
                .build();
    }

}
