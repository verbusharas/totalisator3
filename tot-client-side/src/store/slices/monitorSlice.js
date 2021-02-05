import {createSlice} from "@reduxjs/toolkit";

const initialState = {

    liveFeed: [],
}
export const monitorSlice = createSlice({
    name: 'monitor',
    initialState: initialState,
    reducers: {
        setMonitoredMatches(state, {payload:matches}) {
            // state.liveFeed.push(match)
            state.liveFeed = matches;
        },

        updateLiveMatch(state, {payload:updated}) {
            state.liveFeed.map(current=>{
                if (current.fifaId === updated.fifaId){
                return updated
                } else {
                    return current
                }
            })
        },


    }
})

export default monitorSlice.reducer
export const {setMonitoredMatches, updateLiveMatch} = monitorSlice.actions