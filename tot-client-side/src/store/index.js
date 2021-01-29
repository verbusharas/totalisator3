import {configureStore} from "@reduxjs/toolkit";
import user, {loadUserFromStorage, subscribeToUserChanges} from "./slices/userSlice"
import totalisator, {loadTotalisatorFromStorage, subscribeToTotalisatorChanges} from "./slices/totalisatorSlice"

export const createStore = (initialState) => {
    const store = configureStore({
        reducer: {
            user,
            totalisator
        },
        preloadedState: {
            user: loadUserFromStorage(),
            totalisator: loadTotalisatorFromStorage(),
            ...initialState}
    })
    subscribeToUserChanges(store);
    subscribeToTotalisatorChanges(store);
    return store
}

export default createStore();