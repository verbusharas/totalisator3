import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

 const ManagerMenu = () => {

     const {t} = useTranslation('header');

    return (
        <div className="nav nav--manager">
            <NavLink exact to="/totalisator/manage/matches" className="nav__link"
                     activeClassName="nav__link--active">
                {t("navlink-add-remove-matches")}
            </NavLink>
            <NavLink exact to="/totalisator/manage/players" className="nav__link"
                     activeClassName="nav__link--active">
                {t("navlink-manage-players")}
            </NavLink>
            <NavLink exact to="/totalisator/manage/settings" className="nav__link"
                     activeClassName="nav__link--active">
                {t("navlink-totalisator-settings")}
            </NavLink>
        </div>
    )
}

export default ManagerMenu;