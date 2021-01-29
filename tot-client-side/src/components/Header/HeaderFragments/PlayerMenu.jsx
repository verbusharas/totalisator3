import {NavLink} from "react-router-dom";

const PlayerMenu = () => {
    return (
        <div className="nav">
            <NavLink exact to="/totalisator" className="nav__link" activeClassName="nav__link--active">
                TOTALISATOR OVERVIEW
            </NavLink>
            <NavLink exact to="/totalisator/log" className="nav__link" activeClassName="nav__link--active">
                CHAT & LOG
            </NavLink>
            <NavLink exact to="/user/friends" className="nav__link" activeClassName="nav__link--active">
                FRIENDS
            </NavLink>
            <NavLink exact to="/totalisator/new" className="nav__link" activeClassName="nav__link--active">
                CREATE NEW TOTALISATOR
            </NavLink>
            <NavLink exact to="/about" className="nav__link" activeClassName="nav__link--active">
                ABOUT
            </NavLink>
        </div>
    )
}

export default PlayerMenu;