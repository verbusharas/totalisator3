import useUser from "../../hooks/useUser";
import cx from "classnames";

const StandingsEntry = ({player, handleKick}) => {

    const user = useUser();

    const buttonStyle = {
        backgroundColor: "var(--dark-teal)",
        color: "var(--white-blue)",
        "&:hover": {
            cursor:"pointer",
            backgroundColor: "white"
        }
    }

    const random = (min, max) => {
        const rand = Math.random() * (max - min) + min
        return 50 * Math.ceil(rand / 50);
    }

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
                {random(500,1500)}
            </td>
            {handleKick &&
            <td className="standings__kick-button" onClick={() => handleKick(player)}>kick</td>
            }
        </tr>
        )

}

export default StandingsEntry;