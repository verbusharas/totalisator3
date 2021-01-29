import UserMenu from "./HeaderFragments/UserMenu";
import ManagerMenu from "./HeaderFragments/ManagerMenu";
import PlayerMenu from "./HeaderFragments/PlayerMenu";
import Logo from "./HeaderFragments/Logo";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";

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
        </header>
    )
}

export default Header;
