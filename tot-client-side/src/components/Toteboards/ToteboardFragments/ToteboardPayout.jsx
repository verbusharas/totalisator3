import SeePredictionsLink from "./SeePredictionsLink";

const ToteboardPayout = ({match, payout, handleFlip}) => {
    return (
        <div className="tote-board__results">
            <div className="tote-board__points">
                <span>{`+${payout} Points`}</span>
                <SeePredictionsLink isFinished handleFlip={handleFlip}/>
            </div>
            <div>
                <div className="tote-board__label tote-board__label--highlighted">
                    <p>FINAL SCORE:</p>
                </div>
                <div className="tote-board__score-predict tote-board__score-predict--actual">
                    <input type="text" disabled value={match.homeScore}/>
                    <input type="text" disabled value={match.awayScore}/>
                </div>
            </div>
            <div className="tote-board__points tote-board__points--hidden">
                <span>+500 Points</span>
                <SeePredictionsLink isFinished handleFlip={handleFlip}/>
            </div>
        </div>
    )
}

export default ToteboardPayout;