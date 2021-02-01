import {useSelector} from "react-redux";

const useInplay = () => useSelector(state => state.inplay.liveMatches)
export default useInplay();