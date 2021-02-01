import CountdownTimer from "./CountdownTimer";
import SeePredictionsLink from "./SeePredictionsLink";

const ToteboardIncentives = ({countdownTo, showPredictionsLink, handleFlip, totalPlayers, totalPredictions}) => {
    return (
        <div className="tote-board__incentives">
            {countdownTo && <CountdownTimer countdownTo={countdownTo}/>}

            {showPredictionsLink &&
            <SeePredictionsLink
                handleFlip={handleFlip}
                hasStats={countdownTo}
                totalPlayers={totalPlayers}
                totalPredictions={totalPredictions}/>}
        </div>
    )
}

export default ToteboardIncentives;