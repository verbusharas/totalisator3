import {createSlice} from "@reduxjs/toolkit";

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
        // login: (state, {payload:user}) => (user),
        // logout: (state) => (anonymousUser)
    }
})

export default userSlice.reducer
export const {setUserData, setJwt, clearUserData, clearJwt} = userSlice.actions