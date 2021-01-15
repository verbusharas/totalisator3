import './match-info.css';

const MatchInfo = (props) => {

    return (
        <div className="match-panel" style={props.isSelected?{color:"red"}:{color:"black"}}>
            <p>{props.date} {props.league} ({props.country})</p>
            <p>(HOME) <strong>{props.homeTeam}</strong> vs <strong>{props.awayTeam}</strong> (AWAY)</p>
            <button type="button" onClick={props.onClick}>ADD</button>
        </div>
    )
}

export default MatchInfo;