import Scoreboard from "./ToteboardScoreboard";
import Prediction from "./Prediction";
import useUser from "../../../hooks/useUser";
import {useEffect, useState} from "react";
import {fetchPlayers} from "../../../api/totalisatorApi";
import useTotalisator from "../../../hooks/useTotalisator";
import {getMatchPayouts} from "../../../api/predictionApi";
import {useTranslation} from "react-i18next";

const BacksidePredictions = ({match, variant, getScoreboard, flipToteboard}) => {

    const {t} = useTranslation('toteboard');
    const status = variant.split("-")[1];
    const user = useUser();
    const totalisator = useTotalisator();
    const [payouts, setPayouts] = useState([]);
    const [players, setPlayers] = useState([])

    useEffect(()=>{
        fetchPlayers(totalisator.id).then((res)=>{
            setPlayers(res.data)
        })
        if (variant==="user-finished" || variant==="manager-finished"){
            getMatchPayouts(match.entityId).then(res=>{
                setPayouts(res.data);
            }).finally("from finally");
        }
    },[match.entityId, totalisator.id, variant])

    const getPredictionByPlayerId = (id) => {
        return match.predictions.find(pr=>pr.userId===id)
    }


    const renderPrediction = (player)=> {
        return <Prediction key={player.id + "pred" + match.entityId}
                           player={player}
                           prediction={getPredictionByPlayerId(player.id)}
                           isCurrentUser={player.id === user.id}
                           payout={payouts?.find(p=>p.userId===player.id)}/>
    }

    return (
        <article className={"tote-board tote-board--flipped"}>
            <div className="tote-board__heraldics">
                <span>{match.homeTeam.shortCode}</span>
                {status === "finished" ?
                    <div className="tote-board__label tote-board__label--highlighted">
                        <p style={{margin:"0px 10px 10px 0px"}}>{t("final-score")}</p>
                        <Scoreboard homeScore = {match.homeScore} awayScore={match.awayScore}/>
                    </div>
                    : getScoreboard()
                }
                <span>{match.awayTeam.shortCode}</span>
            </div>
            <div className="tote-board__predictions-list">
                {players.map(p=>renderPrediction(p))}
            </div>

            <p>
                <button className="tote-board__incentives--link" type="button" onClick={()=>flipToteboard()}>
                    {"< Flip back"}
                </button>
            </p>
        </article>
    )
}

export default BacksidePredictions;