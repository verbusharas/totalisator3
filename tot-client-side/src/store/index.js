import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/userSlice"
import totalisator from "./slices/totalisatorSlice"

export const createStore = (initialState) => {
    const store = configureStore({
        reducer: {
            user,
            totalisator
        }
    })
    return store
}

export default createStore();