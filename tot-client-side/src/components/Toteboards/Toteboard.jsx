import ToteboardHeader from "./ToteboardFragments/ToteboardHeader";
import ToteboardScoreLabel from "./ToteboardFragments/ToteboardScoreLabel";
import Scoreboard from "./ToteboardFragments/ToteboardScoreboard";
import {useEffect, useState} from "react";
import ToteboardTeam from "./ToteboardFragments/ToteboardTeam";
import ToteboardIncentives from "./ToteboardFragments/ToteboardIncentives";
import ToteboardButton from "./ToteboardFragments/ToteboardButton";
import ToteboardPayout from "./ToteboardFragments/ToteboardPayout";
import cx from "classnames";
import useTotalisator from "../../hooks/useTotalisator";
import BacksidePredictions from "./ToteboardFragments/BacksidePredictions";
import {fetchPlayers} from "../../api/totalisatorApi";

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

const Toteboard = ({match,
                       prediction,
                       variant,
                       handleClick,
                       handleRegisterPrediction}) => {

    const totalisator = useTotalisator();

    const environment = variant.split("-")[0];

    const status = variant.split("-")[1];
    const isDisabled = (variant === "fifa-added"
        || variant === "fifa-finished"
        || variant === "fifa-invalid");

    const isFlippable = (environment !== "fifa");

    const [isFlipped, setIsFlipped] = useState(false);

    const [homeScore, setHomeScore] = useState("");
    const [awayScore, setAwayScore] = useState("");

    const [players, setPlayers] = useState([]);

    useEffect(()=>{
        fetchPlayers(totalisator.id).then(res=>{
            setPlayers(res.data)
        })
    },[])


    const validateValue = (value) => {
        if (isNaN(value) || value < 0 || value === "" || value === null) {
            return 0;
        } else return value;
    }

    const handleHomeInput = (e) => {
        setHomeScore(e.target.value);
    }

    const handleAwayInput = (e) => {
        setAwayScore(e.target.value);
    }

    const registerPrediction = () => {
        handleRegisterPrediction(match, validateValue(homeScore), validateValue(awayScore));
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

        if (variant === "fifa-finished") {
            return <Scoreboard
                homeScore={match.homeScore}
                awayScore={match.awayScore}
            />;
        }
        if ((environment === "fifa" && status !== "finished")
            || variant === "manager-pending") {
            return <Scoreboard isEmpty/>;
        }

        if (variant === "manager-finished") {
            return <Scoreboard
                homeScore={match.homeScore}
                awayScore={match.awayScore}
            />;
        }

    }

    const validateMatchStatus = () => {
        if (match.statusName === undefined) {
            match.statusName = "unknown"
        }
    }

    const flipToteboard = () => {
       setIsFlipped(!isFlipped);
    }

    const showAverse = () => {
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
                    showPredictionsLink={isFlippable}
                    handleFlip={flipToteboard}
                    totalPlayers={players.length}
                    totalPredictions={match.predictions?.length || 0}
                />}
                {variant === "user-finished" &&

                <ToteboardPayout match={match} handleFlip={flipToteboard}/>}

                <div className="tote-board__footer">
                    {status === "not_predicted"     && <ToteboardButton text="REGISTER PREDICTION" handleClick={registerPrediction}/>}
                    {variant === "fifa-listed"      && <ToteboardButton text="ADD TO TOTALISATOR" handleClick={handleClick}/>}
                    {variant === "fifa-finished"    && <ToteboardButton text="FINISHED" disabled/>}
                    {variant === "fifa-added"       && <ToteboardButton text="ADDED" disabled/>}
                    {validateMatchStatus()}
                    {variant === "fifa-invalid"     && <ToteboardButton text={`STATUS: ${match.statusName.toUpperCase()}`} disabled/>}
                </div>
            </article>
        )
    }

    const showReverse = () => {
        return (
            <BacksidePredictions match={match}
                                 variant={variant}
                                 getScoreboard={getScoreboard}
                                 flipToteboard={flipToteboard}/>
        )
    }

    return isFlipped ? showReverse() : showAverse();
}

export default Toteboard;
