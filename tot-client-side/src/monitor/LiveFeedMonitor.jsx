import {useDispatch} from "react-redux";
import {MONITORING_RANGE_MINS, SCAN_FREQUENCY_MS} from "../config/liveFeedConfig";
import useTotalisator from "../hooks/useTotalisator";
import useInterval from "../hooks/useInterval";
import useMonitor from "../hooks/useMonitor";
import {setMonitoredMatches} from "../store/slices/monitorSlice";
import {fetchMonitoredMatches} from "../api/matchApi";

const LiveFeedMonitor = () => {
    const dispatch = useDispatch();
    const monitor = useMonitor();
    const totalisator = useTotalisator();


    useInterval(() => {
        console.log("updating......")
        fetchMonitoredMatches(totalisator.id).then(res=>{
            dispatch(setMonitoredMatches(res.data))
        })
    }, SCAN_FREQUENCY_MS);

    return <></>
}

export default LiveFeedMonitor;
