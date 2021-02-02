const SeePredictionsLink = ({isFinished, hasStats, handleFlip, totalPlayers, totalPredictions}) => {

    const showStatsAndLink = ()=>{
        return (
            <p>
                    <span className="tote-board__incentives--highlighted">
                        {`${totalPredictions}/${totalPlayers} `}
                    </span>
                people have already predicted.
                <button className="tote-board__incentives--link" type="button" onClick={handleFlip}>
                    Flip to see >
                </button>
            </p>
        )
    }

    const showLinkOnly = ()=> {
        return (
            <p>
                <button className="tote-board__incentives--link" type="button" onClick={handleFlip}>
                    See predictions of other players >
                </button>
            </p>
        )
    }

    const showShortLinkOnly = ()=> {
        return (
            <p style={{margin:0}}>
                <button className="tote-board__incentives--link" type="button" onClick={handleFlip}>
                    See all >
                </button>
            </p>
        )
    }

    return (
        hasStats ? showStatsAndLink() : isFinished ? showShortLinkOnly() : showLinkOnly()
    )
}

export default SeePredictionsLink;