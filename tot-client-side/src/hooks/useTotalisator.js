import {useSelector} from "react-redux";

const useTotalisator = () => useSelector(state => state.totalisator.totalisatorData)
export default useTotalisator;