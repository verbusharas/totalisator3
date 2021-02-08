import {useTranslation} from "react-i18next";

const SeePredictionsLink = ({isFinished, hasStats, handleFlip, totalPlayers, totalPredictions}) => {

    const {t} = useTranslation('toteboard');

    const showStatsAndLink = ()=>{
        return (
            <p>
                    <span className="tote-board__incentives--highlighted">
                        {`${totalPredictions}/${totalPlayers} `}
                    </span>
                {t("people-have-already-predicted")}
                <button className="tote-board__incentives--link" type="button" onClick={handleFlip}>
                    {t("btn-flip-to-see")}
                </button>
            </p>
        )
    }

    const showLinkOnly = ()=> {
        return (
            <p>
                <button className="tote-board__incentives--link" type="button" onClick={handleFlip}>
                    {t("btn-see-predictions")}
                </button>
            </p>
        )
    }

    const showShortLinkOnly = ()=> {
        return (
            <p style={{margin:0}}>
                <button className="tote-board__incentives--link" type="button" onClick={handleFlip}>
                    {t("btn-see-all")}
                </button>
            </p>
        )
    }

    return (
        hasStats ? showStatsAndLink() : isFinished ? showShortLinkOnly() : showLinkOnly()
    )
}

export default SeePredictionsLink;