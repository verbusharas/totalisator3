import useTotalisator from "../../hooks/useTotalisator";
import StandingsEntry from "./StandingsEntry";


const StandingsTable = ({handleKick}) => {

    const totalisator = useTotalisator();

    const renderPlayerRow = (player) => {
        return (
            <StandingsEntry key={player.id} player={player} handleKick={handleKick}/>
        )
    }

    const sort = (players) => {
        players.sort((p1, p2)=>{
            return p1.points - p2.points;
        })
        return players;
    }

    return (
        <article className="standings">
            <table>
                <tbody>
                {totalisator.players?.map(p=>renderPlayerRow(p))}
                </tbody>
            </table>
        </article>
    )
}

export default StandingsTable;

