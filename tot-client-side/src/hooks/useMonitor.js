import {useSelector} from "react-redux";

const useMonitor = () => useSelector(state => state.monitor)
export default useMonitor;