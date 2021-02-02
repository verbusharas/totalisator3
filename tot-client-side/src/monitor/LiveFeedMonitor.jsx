import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addToMonitored} from "../store/slices/monitorSlice";
import {MONITORING_RANGE_MINS, SCAN_FREQUENCY_MS} from "../config/liveFeedConfig";
import useTotalisator from "../hooks/useTotalisator";
import useUser from "../hooks/useUser";
import useMonitor from "../hooks/useMonitor";

const LiveFeedMonitor = ({children}) => {
    const dispatch = useDispatch();
    const totalisator = useTotalisator();
    const user = useUser();
    const mon = useMonitor();

    useEffect(() => {
        if (user !== null && totalisator.matches !== null) {
            setInterval(() => {
                console.log("These are all:", totalisator.matches)
                const toBeMonitored = totalisator.matches
                    // .filter(m=>!mon.monitoredMatches?.includes(m))
                    .filter(m=>isInMonitorRange(m))
                console.log("These are to be monitored:", toBeMonitored)
            }, SCAN_FREQUENCY_MS);
        } else {
            console.log("Either not user or not totalisator")
            console.log("user", user)
            console.log("totalisator", totalisator)
        }
        // startMonitoring(MONITORING_FREQUENCY_MS);
    }, [])


    const startScanningForMatchesToMonitor = (freq) => {

    }

    const isInMonitorRange = (match) => {
        const matchDate = new Date(match.date)
        const now = new Date();
        const diffInMin = parseInt((matchDate-now)/1000/60)
        return diffInMin <= MONITORING_RANGE_MINS;
    }


    const startMonitoring = (freq) => {
        console.log("08. Starting Monitoring...")
        // mon.monitoredMatches?.forEach(m=>{
        //     const updatedMatch = fetchUpdatedMatch(totalisator.id, m)
        //     dispatch()
        // })
    }
    return <>{children}</>
}

export default LiveFeedMonitor;
