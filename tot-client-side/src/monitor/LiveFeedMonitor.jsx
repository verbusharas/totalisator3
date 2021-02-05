import {useDispatch} from "react-redux";
import {MONITORING_RANGE_MINS, SCAN_FREQUENCY_MS} from "../config/liveFeedConfig";
import useTotalisator from "../hooks/useTotalisator";
// import {updateTotalisatorById} from "../api/totalisatorApi";
import {setTotalisator} from "../store/slices/totalisatorSlice";
import useInterval from "../hooks/useInterval";

const LiveFeedMonitor = () => {
    const dispatch = useDispatch();
    const totalisator = useTotalisator();


    useInterval(() => {
        console.log("updating......")
        // updateTotalisatorById(totalisator.id)
        //     .then(res=> dispatch(setTotalisator(res.data)))
    }, SCAN_FREQUENCY_MS);

    return <></>
}

export default LiveFeedMonitor;
