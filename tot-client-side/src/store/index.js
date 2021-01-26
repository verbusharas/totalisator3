import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/userSlice"
import {totalisatorSlice} from "./slices/totalisatorSlice"

export default () => {
    return configureStore({
        reducer: {
            user:userSlice.reducer,
            totalisator:totalisatorSlice.reducer
        }
    })
}