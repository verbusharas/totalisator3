const ToteboardTeam = ({team, status, hasCrest}) => {
    return (
            <div className={`tote-board__team tote-board__team--${status}`}>
                <div className="tote-board__name">
                    <p>{team.name}</p>
                </div>
                <div className="tote-board__heraldics">
                    {status==="away" && <span>{team.shortCode}</span>}
                    <div className="tote-board__crest">
                        {hasCrest && <img src={team.img} alt={`${team.shortCode} crest`}/>}
                    </div>
                    {status==="home" && <span>{team.shortCode}</span>}
                </div>
            </div>
    )
}

export default ToteboardTeam;