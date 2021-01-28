import UserMenu from "./HeaderFragments/UserMenu";
import ManagerMenu from "./HeaderFragments/ManagerMenu";
import PlayerMenu from "./HeaderFragments/PlayerMenu";
import Logo from "./HeaderFragments/Logo";

const Header = () => {
    return (
        <header>
            <Logo/>
            <nav>
                <ManagerMenu/>
                <PlayerMenu/>
            </nav>
            <UserMenu/>
        </header>
    )
}

export default Header;
