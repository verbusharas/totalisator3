import logo from "../../assets/logo.svg"
import {Link, NavLink} from "react-router-dom";
import {connect,useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../store/slices/userSlice";
import {findUserById} from "../../api/soccersApi";

const Header = ({login, logout, loggedInUsername, loggedInUserId}) => {

    let person = {name: "Jonas", id: "7"}

    const game = {title: "SwedbankTotalisator2021", members: ["Jonaitis", "Kazys"]}
    const user_user = useSelector(state => {return state.user})
    const dispatch = useDispatch()

    const handleclick=(id)=>{
        findUserById(id).then(res => {
            dispatch(login(res.data));
        }).catch(err => {
            console.log("Returned -> Error:", err.response.data)
        });
    }



    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img className="logo__img" src={logo} alt="logo"/>
                </Link>
            </div>
            <nav>
                <div className="nav nav--manager">
                    <span className="nav__text">MANAGER MENU:</span>
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
            </nav>
            <div className="user-menu">
                <p onClick={() => handleclick(17)}>Login</p>
                <p onClick={() => logout()}>Logout</p>
                <p>{loggedInUserId}{loggedInUsername}</p>
                {/*<a href="" className="user-menu__link">SIGN OUT</a>*/}
                {/*<NavLink exact to="/user/register"*/}
                {/*         className="nav__link"*/}
                {/*         activeClassName="nav__link--active">*/}
                {/*    SIGN UP*/}
                {/*</NavLink>*/}
            </div>
        </header>
    )
}

const mapStateToProps = ({ user }) => ({
    loggedInUsername: user.name, // loggedInUser: user.name
    loggedInUserId: user.id,
})

const mapDispatchToProps = {login, logout}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
