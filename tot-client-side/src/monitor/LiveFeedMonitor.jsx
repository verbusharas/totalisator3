import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addToMonitored} from "../store/slices/monitorSlice";
import {MONITORING_RANGE_MINS, SCAN_FREQUENCY_MS} from "../config/liveFeedConfig";
import useTotalisator from "../hooks/useTotalisator";
import useUser from "../hooks/useUser";
import useMonitor from "../hooks/useMonitor";
import {updateTotalisatorById} from "../api/totalisatorApi";
import {setTotalisator} from "../store/slices/totalisatorSlice";

const LiveFeedMonitor = ({children}) => {
    const dispatch = useDispatch();
    const totalisator = useTotalisator();
    const user = useUser();
    const monitor = useMonitor();

    useEffect(() => {
        if (user !== null && totalisator.matches !== null) {
            setInterval(() => {
                updateTotalisatorById(totalisator.id)
                    .then(res=>{
                        dispatch(setTotalisator(res.data))
                        console.log("----updated----")
                        console.log(res.data)
                    })

            }, SCAN_FREQUENCY_MS);
        } else {
            console.log("Either not user or not totalisator")
            console.log("user", user)
            console.log("totalisator", totalisator)
        }
    }, [])



    // const isInMonitorRange = (match) => {
    //     const matchDate = new Date(match.date)
    //     const now = new Date();
    //     const diffInMin = parseInt((matchDate-now)/1000/60)
    //     return diffInMin <= MONITORING_RANGE_MINS;
    // }


    // const startMonitoring = (freq) => {
    //     console.log("08. Starting Monitoring...")
    //     // mon.monitoredMatches?.forEach(m=>{
    //     //     const updatedMatch = fetchUpdatedMatch(totalisator.id, m)
    //     //     dispatch()
    //     // })
    // }
    return <></>
}

export default LiveFeedMonitor;
