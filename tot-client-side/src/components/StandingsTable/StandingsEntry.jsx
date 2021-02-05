import useUser from "../../hooks/useUser";
import cx from "classnames";

const StandingsEntry = ({player, handleKick, totals}) => {

    const user = useUser();

    return (
        <tr>
            <td className={cx({
                "standings__player": true,
                "standings__player--highlighted": user.id===player.id})}>
                {player.name.toUpperCase()}
            </td>
            <td className={cx({
                "standings__points": true,
                "standings__points--highlighted": user.id===player.id})}>
                {totals}
            </td>
            {handleKick &&
            <td className="standings__kick-button" onClick={() => handleKick(player)}>kick</td>
            }
        </tr>
        )

}

export default StandingsEntry;