import './panels.css';
import {makeStyles} from "@material-ui/core";


const FixtureToteboard = ({fixture, handleClick, isAdded}) => {

    const status = fixture.status_name;
    let message = "ADD TO TOTALISATOR";
    let isDisabled = true;
    let isFinished = false;
    let score = "_ : _";
    switch (status) {
        case "Finished" : {
            message = "FIXTURE IS FINISHED";
            isFinished = true;
            score = fixture.scores.home_score + " : " + fixture.scores.away_score;
        }
            break;
        case "Postponed" :
            message = "FIXTURE IS POSTPONED";
            break;
        case "Notstarted" :
            isDisabled = false;
            break;
        default :
            message = "FIXTURE STATUS UNKNOWN"
    }
    if (isAdded) {
        isDisabled=true;
        message = "THIS FIXTURE IS ADDED TO YOUR TOTALISATOR"
    }
    const useStyles = makeStyles(() => ({
        panelStyle: {
            backgroundColor: isAdded ? "var(--very-light-green)" : "var(--medium-grey)",
            width: "100%",
            fontSize: "9pt",
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px 10px 0px",
            color: isDisabled ? "var(--medium-dark-grey)" : "black",
        },
        crestStyle: {
            height: "45px",
            width: "45px",
            margin: "10px",
            opacity: isDisabled ? 0.3 : 1
        }

    }));
    const classes = useStyles();
    return (
        <div className={classes.panelStyle}>
            <div className="panel-header">
                <p className="info mt10">{fixture.date.slice(0, 16)} {fixture.league.countryName} {fixture.league.name}</p>
            </div>
            <div className="middle-row">
                <div className="column">
                    <h3 className="highlighted">HOME</h3>
                    <img className={classes.crestStyle} src={fixture.homeTeam.img} alt={fixture.homeTeam.shortCode}/>
                </div>
                <div className="center">
                    <div className="column align-right">
                        <div className="team-name">
                            <p className="text-right">{fixture.homeTeam.name}</p>
                        </div>
                        <h2 className="highlighted">{fixture.homeTeam.shortCode}</h2>
                    </div>
                    <div className="column">
                        <h2 className="score">{score}</h2>
                    </div>
                    <div className="column align-left">
                        <div className="team-name">
                            <p className="text-left">{fixture.awayTeam.name}</p>
                        </div>
                        <h2 className="highlighted">{fixture.awayTeam.shortCode}</h2>
                    </div>
                </div>
                <div className="column">
                    <h3 className="highlighted">AWAY</h3>
                    <img className={classes.crestStyle} src={fixture.awayTeam.img} alt={fixture.awayTeam.shortCode}/>
                </div>
            </div>
            <div className="panel-footer">
                {!isDisabled
                    ? <button type="button" onClick={handleClick} className="panel-button">ADD TO TOTALISATOR ></button>
                    : <h4 className="highlighted">{message}</h4>}

            </div>
        </div>


    )
}

export default FixtureToteboard;