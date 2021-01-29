import {useSelector} from "react-redux";

const useUser = () => useSelector(state => state.user.userData)
export default useUser;