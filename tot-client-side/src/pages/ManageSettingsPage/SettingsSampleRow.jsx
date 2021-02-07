const SettingsSampleRow = ({payout}) => {
    return (
        <tr>
            <td>
                <strong className="settings__sample-row--prediction"> {payout.homeScorePrediction} : {payout.awayScorePrediction}</strong>
            </td>
            <td>
                <strong className="settings__sample-row--total-award">{payout.award > 0 ? "+" + payout.award : payout.award}</strong>&nbsp;&nbsp;&nbsp;=
            </td>
            <td>
                {payout.pointsForAccurateScore}
            </td>
            <td>
                + {payout.pointsForAccurateGoalDifference}
            </td>
            <td>
                + {payout.pointsForAccurateWinner}
            </td>
            <td>
                + {payout.pointsForAccurateGoals}
            </td>
            <td>
                + ({payout.pointsForAccuracy}
            </td>
            <td>
                {payout.penaltyForMissedGoals === 0 ? "-0" : payout.penaltyForMissedGoals})
            </td>
        </tr>
    )
}

export default SettingsSampleRow;