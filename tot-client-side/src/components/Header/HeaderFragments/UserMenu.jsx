import useUser from "../../../hooks/useUser";
import {useDispatch} from "react-redux";
import {clearJwt, clearUserData} from "../../../store/slices/userSlice";

const UserMenu = () => {

    const user = useUser();
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearJwt())
        dispatch(clearUserData())
    }

    return (
        <div className="user-menu">
            <div className="user-menu__lang-select">
                <a href="/" className="user-menu__link">LT</a>
                <a href="/" className="user-menu__link">EN</a>
            </div>
            {
                user ?
                    <>
                        <span className="user-menu__text">{`${user.name}`}</span>
                        <button className="user-menu__link" onClick={logout}>Sign Out</button>
                    </>
                    : <a href="/user/login" className="user-menu__link">Sign In</a>
            }
        </div>
    )
}

export default UserMenu;