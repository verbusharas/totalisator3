import SeePredictionsLink from "./SeePredictionsLink";
import {useEffect, useState} from "react";
import {getMatchPlayerPayout} from "../../../api/predictionApi";
import useUser from "../../../hooks/useUser";

const ToteboardPayout = ({match, handleFlip}) => {

    const [payout, setPayout] = useState({});
    const user = useUser();

    useEffect(() => {
        let isSubscribed = true
        getMatchPlayerPayout(match.entityId).then((res)=>{
            if(isSubscribed) {
                setPayout(res.data);
            }
        })
        return () => isSubscribed = false;
    }, [user.id, match.entityId])

    return (
        <div className="tote-board__results">
            <div className="tote-board__points">
                <span>{`+${payout.award || '0'} Points`}</span>
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
                <span>{`+${payout?.award} Points`}</span>
                <SeePredictionsLink isFinished handleFlip={handleFlip}/>
            </div>
        </div>
    )
}

export default ToteboardPayout;