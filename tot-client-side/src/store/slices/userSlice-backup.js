import {configureStore, createSlice} from "@reduxjs/toolkit";

const anonymousUser = {name:"_Anonymous", surname:"_Anonymous"}

const userSlice = createSlice({
    name: 'user',
    initialState: anonymousUser,
    reducers: {
        login: (state, {payload:user}) => (user),
        logout: (state) => (anonymousUser)
    }
})

export default () => {
    return configureStore({
        reducer: {
            user:userSlice.reducer
        }
    })
}

export const {login, logout} = userSlice.actions
export const {user} = userSlice.reducer