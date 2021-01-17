import './panels.css';

const MatchPanel = ({fixture, handleClick}) => {
    return (
        <div className="panel">
            <div className="panel-header">
                <p className="info mt10">{fixture.date.slice(0, 16)} {fixture.league.countryName} {fixture.league.name}</p>
            </div>
            <div className="middle-row">
                <div className="column">
                    <h3 className="highlighted">HOME</h3>
                    <img className="crest" src={fixture.homeTeam.img} alt={fixture.homeTeam.short_code}/>
                </div>
                <div className="center">
                    <div className="column align-right">
                        <p className="info">{fixture.homeTeam.name}</p>
                        <h2 className="highlighted">{fixture.homeTeam.shortCode}</h2>
                    </div>
                    <div className="column">
                        <p className="m10">vs</p>
                    </div>
                    <div className="column align-left">
                        <p className="info">{fixture.awayTeam.name}</p>
                        <h2 className="highlighted">{fixture.awayTeam.shortCode}</h2>
                    </div>
                </div>
                <div className="column">
                    <h3 className="highlighted">AWAY</h3>
                    <img className="crest" src={fixture.awayTeam.img} alt={fixture.awayTeam.shortCode}/>
                </div>
            </div>
        </div>


    )
}

export default MatchPanel;