import {Link} from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default () => {
    return (
        <div className="logo">
            <Link to="/">
                <img className="logo__img" src={logo} alt="logo"/>
            </Link>
        </div>
    )
}