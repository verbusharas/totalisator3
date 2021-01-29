const SeePredictionsLink = ({hasStats}) => {

    const showStatsAndLink = ()=>{
        return (
            <p>
                    <span className="tote-board__incentives--highlighted">
                        {`3/6 `}
                    </span>
                people have already predicted.
                <a className="tote-board__incentives--link" href="/">
                    Flip to see >
                </a>
            </p>
        )
    }

    const showLinkOnly = ()=> {
        return (
            <p>
                <a className="tote-board__incentives--link" href="/">
                   See predictions of other players >
                </a>
            </p>
        )
    }

    return (
        hasStats ? showStatsAndLink() : showLinkOnly()
    )
}

export default SeePredictionsLink;