import UserMenu from "./HeaderFragments/UserMenu";
import ManagerMenu from "./HeaderFragments/ManagerMenu";
import PlayerMenu from "./HeaderFragments/PlayerMenu";
import Logo from "./HeaderFragments/Logo";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import blink from "../../assets/images/blink.gif"
import LiveFeedMonitor from "../../monitor/LiveFeedMonitor";
import {Provider} from "react-redux";
import useMonitor from "../../hooks/useMonitor";

const Header = () => {


    const user = useUser();
    const totalisator = useTotalisator()
    const monitor = useMonitor();

    const renderLiveMatch = (m) => {
        // console.log("rendering live match", m)
        return (
            <div className="header__live-match">
                {m.statusName==="Inplay" &&
                <div className="header__live-status">
                    <img style={{width: "10px", height: "10px"}} src={blink} alt="blink"/>
                    <span >&nbsp;LIVE</span>
                </div>
                }
                {m.statusName==="Finished" &&
                <div>
                    <span>&nbsp;FINISHED</span>
                </div>
                }
                <span className="header__live-team">{m.homeTeam.shortCode}</span>
                <span className="header__live-score">{m.homeScore}</span>
                <span>:</span>
                <span className="header__live-score">{m.awayScore}</span>
                <span className="header__live-team">{m.awayTeam.shortCode}</span>
            </div>
        )
    }

    return (
        <header>
            <div className = "header__menu">
                {user && totalisator?.id && <LiveFeedMonitor/>}
                <Logo/>
                <nav>
                    {totalisator && user && totalisator.managerId === user.id &&
                    <ManagerMenu/>
                    }
                    <PlayerMenu/>
                </nav>

                <UserMenu/>

            </div>
            <div className = "header__live-feed">
                {
                    monitor.liveFeed.length > 0 && monitor.liveFeed.map(renderLiveMatch)
                }
            </div>

        </header>
    )
}

export default Header;
