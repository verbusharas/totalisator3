import {NavLink} from "react-router-dom";
import useUser from "../../../hooks/useUser";
import {useTranslation} from "react-i18next";

const PlayerMenu = () => {
    const user = useUser();
    const {t} = useTranslation('header');

    return (
        <div className="nav">
            <NavLink exact to="/totalisator" className="nav__link" activeClassName="nav__link--active">
                {t("navlink-totalisator-overview")}
            </NavLink>
            <NavLink exact to="/totalisator/log" className="nav__link" activeClassName="nav__link--active">
                {t("navlink-chat-log")}
            </NavLink>
            <NavLink exact to="/user/friends" className="nav__link" activeClassName="nav__link--active">
                {t("navlink-friends")}
            </NavLink>
            <NavLink exact to="/totalisator/new" className="nav__link" activeClassName="nav__link--active">
                {t("navlink-create-new-totalisator")}
            </NavLink>
            <NavLink exact to="/about" className="nav__link" activeClassName="nav__link--active">
                {t("navlink-about")}
            </NavLink>
            {user?.roles.includes("ADMIN") &&
            <NavLink exact to="/admin" className="nav__link" activeClassName="nav__link--active">
                ADMIN
            </NavLink>
            }
        </div>
    )
}

export default PlayerMenu;