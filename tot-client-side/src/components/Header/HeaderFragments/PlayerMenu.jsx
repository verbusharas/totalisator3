import {NavLink} from "react-router-dom";
import useUser from "../../../hooks/useUser";

const PlayerMenu = () => {
    const user = useUser();
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
            {user?.roles.includes("ADMIN") &&
            <NavLink exact to="/admin" className="nav__link" activeClassName="nav__link--active">
                ADMIN
            </NavLink>
            }
        </div>
    )
}

export default PlayerMenu;