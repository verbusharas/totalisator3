import './fixture.css';

const Fixture = (props) => {

    return (
        <div className={props.isSelected ? "disabled" : "enabled"}>
            <p>{props.date} {props.league} ({props.country})</p>
            <p>(HOME) <strong>{props.homeTeam}</strong> vs <strong>{props.awayTeam}</strong> (AWAY)</p>
            {!props.isSelected
                ? <button type="button" onClick={props.onClick}>SELECT</button>
                : <button type="button" disabled>SELECTED</button>
            }
        </div>
    )
}

export default Fixture;