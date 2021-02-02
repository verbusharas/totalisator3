import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addToMonitored} from "../store/slices/monitorSlice";
import {MONITORING_RANGE_MINS, SCAN_FREQUENCY_MS} from "../config/liveFeedConfig";
import useTotalisator from "../hooks/useTotalisator";
import useUser from "../hooks/useUser";
import {updateTotalisatorById} from "../api/totalisatorApi";
import {setTotalisator} from "../store/slices/totalisatorSlice";

const LiveFeedMonitor = () => {
    const dispatch = useDispatch();
    const totalisator = useTotalisator();
    const user = useUser();

    useEffect(() => {
        if (user && totalisator.matches) {
            setInterval(() => {
                updateTotalisatorById(totalisator.id)
                    .then(res=> dispatch(setTotalisator(res.data)))
            }, SCAN_FREQUENCY_MS);
        } else {
        }
    }, [])

    return <></>
}

export default LiveFeedMonitor;
