import UserMenu from "./HeaderFragments/UserMenu";
import ManagerMenu from "./HeaderFragments/ManagerMenu";
import PlayerMenu from "./HeaderFragments/PlayerMenu";
import Logo from "./HeaderFragments/Logo";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import blink from "../../assets/images/blink.gif"

const Header = () => {

    const user = useUser();
    const totalisator = useTotalisator()

    return (
        <header>
            <Logo/>
            <nav>
                {totalisator && user && totalisator.managerId === user.id &&
                <ManagerMenu/>
                }
                <PlayerMenu/>
            </nav>
            <UserMenu/>
            <div>
                <img style={{width:"10px", height:"10px"}}src={blink} alt="blink"/>
                <span>&nbsp;LIVE</span>
            </div>

        </header>
    )
}

export default Header;
