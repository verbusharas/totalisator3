import {createSlice} from "@reduxjs/toolkit";
import {loadFromStorage, saveToStorage} from "../../utils/localStorage";
import _ from "lodash"

const anonymousUser = {
    userData: null,
    jwt: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState: anonymousUser,
    reducers: {
        setUserData(state, {payload:user}) {
            state.userData = user
        },
        setJwt(state,{payload:jwt}) {
            state.jwt = jwt
        },

        clearUserData(state){
            state.userData = null
        },

        clearJwt(state){
            state.jwt = null
        }
    }
})

let prevUser = anonymousUser;

export const subscribeToUserChanges = (store) => {
    store.subscribe(_.throttle(() => {
        const currentUser = store.getState().user
        if (prevUser !== currentUser) {
            prevUser = currentUser;
            saveToStorage("user", currentUser)
        }
    }, 1000))
}

export const loadUserFromStorage = () => loadFromStorage("user");

export default userSlice.reducer
export const {setUserData, setJwt, clearUserData, clearJwt} = userSlice.actions