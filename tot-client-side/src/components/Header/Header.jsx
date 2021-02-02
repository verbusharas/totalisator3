import UserMenu from "./HeaderFragments/UserMenu";
import ManagerMenu from "./HeaderFragments/ManagerMenu";
import PlayerMenu from "./HeaderFragments/PlayerMenu";
import Logo from "./HeaderFragments/Logo";
import useTotalisator from "../../hooks/useTotalisator";
import useUser from "../../hooks/useUser";
import blink from "../../assets/images/blink.gif"
import LiveFeedMonitor from "../../monitor/LiveFeedMonitor";
import {Provider} from "react-redux";

const Header = () => {


    const user = useUser();
    const totalisator = useTotalisator()
    const liveMatches = totalisator.matches?.filter(m => m.statusName === "Inplay")

    const renderLiveMatch = (m) => {
        console.log("rendering live match", m)
        return (
            <div>
                {m.statusName==="Inplay" &&
                <div>
                    <img style={{width: "10px", height: "10px"}} src={blink} alt="blink"/>
                    <span>&nbsp;LIVE</span>
                </div>
                }
                {m.statusName==="Finished" &&
                <div>
                    <span>&nbsp;FINISHED</span>
                </div>
                }
                <p>{m.homeTeam.shortCode} {m.homeScore} : {m.awayScore} {m.awayTeam.shortCode}</p>
            </div>
        )
    }

    const test = () => {
        console.log("live matches", liveMatches)
    }

    return (
        <header>

            {user && totalisator?.id && <LiveFeedMonitor/>}
            <Logo/>
            <nav>
                {totalisator && user && totalisator.managerId === user.id &&
                <ManagerMenu/>
                }
                <PlayerMenu/>
            </nav>

            <UserMenu/>
            {
                liveMatches?.length > 0 && liveMatches.map(renderLiveMatch)
            }
        </header>
    )
}

export default Header;
