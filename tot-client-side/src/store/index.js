import {configureStore} from "@reduxjs/toolkit";
import user, {loadUserFromStorage, subscribeToUserChanges} from "./slices/userSlice"
import totalisator, {loadTotalisatorFromStorage, subscribeToTotalisatorChanges} from "./slices/totalisatorSlice"
import monitor from "./slices/monitorSlice"
import preferences from "./slices/preferencesSlice"

export const createStore = (initialState) => {
    const store = configureStore({
        reducer: {
            user,
            preferences,
            totalisator,
            monitor,

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