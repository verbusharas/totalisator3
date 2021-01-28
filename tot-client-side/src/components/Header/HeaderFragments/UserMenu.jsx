import useUser from "../../../hooks/useUser";
import Button from "../../Forms/Button";
import {useDispatch} from "react-redux";
import {clearJwt, clearUserData} from "../../../store/slices/userSlice";

export default () => {
    const user = useUser();
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearJwt())
        dispatch(clearUserData())
    }

    return (
        <div className="user-menu">
            <div className= "user-menu__lang-select">
                <a className="user-menu__link">LT</a>
                <a className="user-menu__link">EN</a>
            </div>
        {
            user ?
                <>
                    <span className="user-menu__text">{`${user.name}`}</span>
                    <a className="user-menu__link" onClick={logout}>Sign Out</a>
                </>
            : <a href="/user/login" className="user-menu__link">Sign In</a>
        }
        </div>
    )
}