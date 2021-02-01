import {NavLink} from "react-router-dom";

 const ManagerMenu = () => {
    return (
        <div className="nav nav--manager">
            <NavLink exact to="/totalisator/manage/matches" className="nav__link"
                     activeClassName="nav__link--active">
                ADD / REMOVE MATCHES
            </NavLink>
            <NavLink exact to="/totalisator/manage/players" className="nav__link"
                     activeClassName="nav__link--active">
                MANAGE PLAYERS
            </NavLink>
            <NavLink exact to="/totalisator/manage/settings" className="nav__link"
                     activeClassName="nav__link--active">
                TOTALISATOR SETTINGS
            </NavLink>
        </div>
    )
}

export default ManagerMenu;