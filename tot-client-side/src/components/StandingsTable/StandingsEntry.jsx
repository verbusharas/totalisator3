import useUser from "../../hooks/useUser";
import cx from "classnames";
import useTotalisator from "../../hooks/useTotalisator";
import {useTranslation} from "react-i18next";

const StandingsEntry = ({player, handleKick, totals}) => {

    const {t} = useTranslation('manage-totalisator');

    const user = useUser();
    const totalisator = useTotalisator();

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
            {handleKick && (player.id !== totalisator.managerId) &&
            <td className="standings__kick-button" onClick={() => handleKick(player)}>{t("kick")}</td>
            }
        </tr>
        )

}

export default StandingsEntry;