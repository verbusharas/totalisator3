import CountdownTimer from "./CountdownTimer";
import SeePredictionsLink from "./SeePredictionsLink";

export default ({countdownTo, showPredictionsLink}) => {
    return (
        <div className="tote-board__incentives">
            {countdownTo && <CountdownTimer countdownTo={countdownTo}/>}
            {showPredictionsLink && <SeePredictionsLink hasStats={countdownTo}/>}
        </div>
    )
}