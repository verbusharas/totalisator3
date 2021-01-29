import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";
import {loadFromStorage, saveToStorage} from "../../utils/localStorage";

const initialState = {
    totalisatorData: null,
}
export const totalisatorSlice = createSlice({
    name: 'totalisator',
    initialState: initialState,
    reducers: {
        setTotalisator(state, {payload:totalisator}) {
            state.totalisatorData = totalisator
        },

        clearTotalisator(state){
            state.totalisatorData = null
        },
    }
})

let prevTotalisator = initialState;

export const subscribeToTotalisatorChanges = (store) => {
    store.subscribe(_.throttle(() => {
        const currentTotalisator = store.getState().totalisator
        if (prevTotalisator !== currentTotalisator) {
            prevTotalisator = currentTotalisator;
            saveToStorage("totalisator", currentTotalisator)
        }
    }, 1000))
}

export const loadTotalisatorFromStorage = () => loadFromStorage("totalisator");

export default totalisatorSlice.reducer
export const {setTotalisator, clearTotalisator} = totalisatorSlice.actions