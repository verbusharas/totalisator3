import useTotalisator from "../../hooks/useTotalisator";
import StandingsEntry from "./StandingsEntry";
import {useEffect, useState} from "react";
import {getTotalisatorPayouts} from "../../api/predictionApi";
import {fetchPlayers} from "../../api/totalisatorApi";


const StandingsTable = ({handleKick, players}) => {

    const totalisator = useTotalisator();
    const [payouts, setPayouts] = useState([]);

    useEffect(()=> {
        getTotalisatorPayouts(totalisator.id).then(res=>{
            setPayouts(res.data);
        })
    }, [totalisator.id, handleKick])

    const appendTotals = (player) => {
        const calculator = (sum, currentValue) => sum + currentValue;
        const playerTotals = payouts
            .filter(payout=>payout.userId===player.id)
            .map(payout=>payout.award)
            .reduce(calculator,0)
        return {
            ...player,
            totals: playerTotals
        }
    }

    const renderPlayerRow = (player) => {
        return (
            <StandingsEntry key={player.id} player={player} totals={player.totals} handleKick={handleKick}/>
        )
    }

    const byTotals = (p1, p2) => {
            return p2.totals - p1.totals;
    }

    return (
        <article className="standings">
            <table>
                <tbody>
                {players.map(p=>appendTotals(p)).sort(byTotals).map(p=>renderPlayerRow(p))}
                </tbody>
            </table>
        </article>
    )
}

export default StandingsTable;

