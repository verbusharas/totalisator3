import {createSlice} from "@reduxjs/toolkit";

const anonymousUser = {id:17}

export const userSlice = createSlice({
    name: 'user',
    initialState: anonymousUser,
    reducers: {
        login: (state, {payload:user}) => (user),
        logout: (state) => (anonymousUser)
    }
})

export const {login, logout} = userSlice.actions