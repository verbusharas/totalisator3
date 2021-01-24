import ToteboardHeader from "./ToteboardFragments/ToteboardHeader";
import ToteboardScoreLabel from "./ToteboardFragments/ToteboardScoreLabel";
import Scoreboard from "./ToteboardFragments/ToteboardScoreboard";
import {useState} from "react";
import ToteboardTeam from "./ToteboardFragments/ToteboardTeam";
import ToteboardIncentives from "./ToteboardFragments/ToteboardIncentives";
import ToteboardButton from "./ToteboardFragments/ToteboardButton";
import ToteboardPayout from "./ToteboardFragments/ToteboardPayout";
import cx from "classnames";

// Variant structure: "{environment}-{status}"
// Supported variants:
// -------------------
// - "fifa-listed"
// - "fifa-added"
// - "fifa-finished"
// - "fifa-invalid"
// - "manager-pending"
// - "manager-finished"
// - "user-not_predicted"
// - "user-pending"
// - "user-finished"

export default ({match, prediction, variant}) => {

    const environment = variant.split("-")[0];
    const status = variant.split("-")[1];

    const isDisabled = (variant === "fifa-added"
        || variant === "fifa-finished"
        || variant === "fifa-invalid");

    const [homeScore, setHomeScore] = useState("");
    const [awayScore, setAwayScore] = useState("");

    const handleHomeInput = (e) => {
        setHomeScore(e.target.value);
        console.log("HomeInputTargetValue", e.target.value);
    }

    const handleAwayInput = (e) => {
        setAwayScore(e.target.value);
        console.log("AwayInputTargetValue", e.target.value);
    }

    const getScoreboard = () => {
        if (variant === "user-not_predicted") {
            return <Scoreboard
                homeScore={homeScore}
                awayScore={awayScore}
                homeInput={handleHomeInput}
                awayInput={handleAwayInput}
                isEditable
            />;
        }
        if (variant === "user-pending") {
            return <Scoreboard
                homeScore={prediction.homeScore}
                awayScore={prediction.awayScore}
            />;
        }
        if (variant === "user-finished") {
            return <Scoreboard
                homeScore={prediction.homeScore}
                awayScore={prediction.awayScore}
            />;
        }

        if ((environment === "fifa" && status !== "finished")
            || variant === "manager-pending") {
            return <Scoreboard isEmpty/>;
        }

        if (variant === "fifa-finished" || variant === "manager-finished")
            {
            return <Scoreboard
                homeScore={match.scores.home_score}
                awayScore={match.scores.away_score}
            />;
        }

    }

    return (

        <article className={cx({"tote-board": true, "tote-board--disabled": isDisabled})}>
            <ToteboardHeader date={match.date} league={match.league}/>
            {environment === "user" && <ToteboardScoreLabel text="Your prediction:"/>}
            <div className="tote-board__main">
                <ToteboardTeam team={match.homeTeam} status="home"
                               hasCrest={environment !== "fifa" && status !== "finished"}/>
                {getScoreboard()}
                <ToteboardTeam team={match.awayTeam} status="away"
                               hasCrest={environment !== "fifa" && status !== "finished"}/>
            </div>
            {variant !== "user-finished" && <ToteboardIncentives
                countdownTo={(variant === "manager-pending" || variant === "user-not_predicted") && match.date}
                showPredictionsLink={environment !== "fifa"}
            />}
            {variant === "user-finished" &&
            <ToteboardPayout scores={match.scores} payout={prediction.payout}/>}
            <div className="tote-board__footer">
                {status === "not_predicted" && <ToteboardButton text="REGISTER PREDICTION"/>}
                {variant === "fifa-listed" && <ToteboardButton text="ADD TO TOTALISATOR"/>}
                {variant === "fifa-finished" && <ToteboardButton text="FINISHED" disabled/>}
                {variant === "fifa-added" && <ToteboardButton text="ADDED" disabled/>}
                {variant === "fifa-invalid" && <ToteboardButton text={`STATUS: ${match.status_name.toUpperCase()}`} disabled/>}
            </div>
        </article>
    )
}

