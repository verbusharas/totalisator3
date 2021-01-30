const SeePredictionsLink = ({hasStats, handleFlip}) => {

    const showStatsAndLink = ()=>{
        return (
            <p>
                    <span className="tote-board__incentives--highlighted">
                        {`3/6 `}
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

    return (
        hasStats ? showStatsAndLink() : showLinkOnly()
    )
}

export default SeePredictionsLink;