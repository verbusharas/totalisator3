import './fixture.css';

const AddedeMatch = (props) => {

    return (
        <div className="added-match">
            <button type="button" onClick={props.removeClicked}>x</button>
            <p>{props.date} {props.league} ({props.country})</p>
            <p>(HOME) <strong>{props.homeTeam}</strong> vs <strong>{props.awayTeam}</strong> (AWAY)</p>
        </div>
    )
}

export default AddedeMatch;