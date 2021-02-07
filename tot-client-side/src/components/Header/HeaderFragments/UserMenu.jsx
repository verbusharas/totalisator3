import useUser from "../../../hooks/useUser";
import {useDispatch} from "react-redux";
import {clearJwt, clearUserData} from "../../../store/slices/userSlice";
import {clearTotalisator} from "../../../store/slices/totalisatorSlice";
import {useTranslation} from "react-i18next";
import cx from "classnames";

const UserMenu = () => {

    const user = useUser();
    const dispatch = useDispatch()

    const {t, i18n} = useTranslation('header');


    const logout = () => {
        dispatch(clearJwt())
        dispatch(clearUserData())
        dispatch(clearTotalisator())
    }

    const handleClick = (langCode) => {
        i18n.changeLanguage(langCode);
    }

    return (
        <div className="user-menu">
            <div className="user-menu__lang-select">
                <button className={cx({"user-menu__link": true, "nav__link--active": i18n.language==="lt"})}
                        onClick={()=>handleClick("lt")}>
                    LT
                </button>
                <button className={cx({"user-menu__link": true, "nav__link--active": i18n.language==="en"})}
                    onClick={()=>handleClick("en")}>
                    EN
                </button>
            </div>
            {
                user ?
                    <>
                        <span className="user-menu__text">{`${user.name}`}</span>
                        <button className="user-menu__link" onClick={logout}>{t("sign-out")}</button>
                    </>
                    : <a href="/user/login" className="user-menu__link">Sign In</a>
            }
        </div>
    )
}

export default UserMenu;