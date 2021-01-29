const ToteboardHeader = ({date, league}) => {
    return (
        <div className="tote-board__header">
            <p>{`${date.slice(0, 16)} ${league.countryName} ${league.name}`}</p>
        </div>
    )
}

export default ToteboardHeader;