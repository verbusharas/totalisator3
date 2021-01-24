export default ({scores:{home_score}={}, scores:{away_score}={}, payout}) => {
    return (
        <div className="tote-board__results">
            <div className="tote-board__points">
                <span>{`+${payout} Points`}</span>
                <a className="tote-board__incentives--link" href="">See all ></a>
            </div>
            <div>
                <div className="tote-board__label tote-board__label--highlighted">
                    <p>FINAL SCORE:</p>
                </div>
                <div className="tote-board__score-predict tote-board__score-predict--actual">
                    <input type="text" disabled value={home_score}/>
                    <input type="text" disabled value={away_score}/>
                </div>
            </div>
            <div className="tote-board__points tote-board__points--hidden">
                <span>+500 Points</span>
                <a className="tote-board__incentives--link" href="">See all ></a>
            </div>
        </div>
    )
}