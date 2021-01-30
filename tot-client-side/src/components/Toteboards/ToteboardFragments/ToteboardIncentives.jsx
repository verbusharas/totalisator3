import CountdownTimer from "./CountdownTimer";
import SeePredictionsLink from "./SeePredictionsLink";

const ToteboardIncentives = ({countdownTo, showPredictionsLink, handleFlip}) => {
    return (
        <div className="tote-board__incentives">
            {countdownTo && <CountdownTimer countdownTo={countdownTo}/>}
            {showPredictionsLink && <SeePredictionsLink handleFlip={handleFlip} hasStats={countdownTo}/>}
        </div>
    )
}

export default ToteboardIncentives;