import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addToMonitored} from "../store/slices/monitorSlice";
import {MONITORING_RANGE_MINS, SCAN_FREQUENCY_MS} from "../config/liveFeedConfig";
import useTotalisator from "../hooks/useTotalisator";
import useUser from "../hooks/useUser";
import {updateTotalisatorById} from "../api/totalisatorApi";
import {setTotalisator, subscribeToTotalisatorChanges} from "../store/slices/totalisatorSlice";
import store from "../store"

const LiveFeedMonitor = () => {
    const dispatch = useDispatch();
    const totalisator = useTotalisator();
    const user = useUser();

    useEffect(() => {
        if (user && totalisator.matches) {
            let id = totalisator.id;
            store.subscribe(()=>{
                id = store.getState().totalisator?.totalisatorData?.id
            })
            setInterval(() => {
                console.log("updating......")
                updateTotalisatorById(id ? id : totalisator.id)
                    .then(res=> dispatch(setTotalisator(res.data)))
            }, SCAN_FREQUENCY_MS);
        } else {
        }
    }, [])

    return <></>
}

export default LiveFeedMonitor;
