import {useSelector} from "react-redux";

const usePreferences = () => useSelector(state => state.preferences.data)
export default usePreferences;