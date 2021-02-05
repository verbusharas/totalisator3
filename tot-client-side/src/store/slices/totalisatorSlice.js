import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";
import {loadFromStorage, saveToStorage} from "../../utils/localStorage";

const initialState = {
    totalisatorData: null
}
export const totalisatorSlice = createSlice({
    name: 'totalisator',
    initialState: initialState,
    reducers: {
        setTotalisator(state, {payload:totalisator}) {
            state.totalisatorData = totalisator
        },

        // addMatch(state, {payload:match}) {
        //     state.totalisatorData.matches.push(match);
        // },
        //
        // setMatches(state, {payload:matches}) {
        //     state.totalisatorData.matches = matches;
        // },
        //
        // addPrediction(state, {payload:prediction}) {
        //     const {userId, homeScore, awayScore, matchIndex} = prediction;
        //     const predictionDTO = {
        //         userId,
        //         homeScore,
        //         awayScore
        //     }
        //     state.totalisatorData.matches[matchIndex].predictions.push(predictionDTO);
        // },

        clearTotalisator(state){
            const prevTotalisatorId = state.totalisatorData.id;
            // state.totalisatorData = null
            state.totalisatorData = {prevId:prevTotalisatorId}
        },
    }
})

let prevTotalisator = initialState;

export const subscribeToTotalisatorChanges = (store) => {
    store.subscribe(_.throttle(() => {
        const currentTotalisator = store.getState().totalisator
        console.log("currentTotalisator", currentTotalisator)
        console.log("prevTotalisator", prevTotalisator)
        if (prevTotalisator !== currentTotalisator) {
            prevTotalisator = currentTotalisator;
            saveToStorage("totalisator", currentTotalisator)
        }
    }, 1000))
}

export const loadTotalisatorFromStorage = () => loadFromStorage("totalisator");

export default totalisatorSlice.reducer
export const {setTotalisator, clearTotalisator} = totalisatorSlice.actions