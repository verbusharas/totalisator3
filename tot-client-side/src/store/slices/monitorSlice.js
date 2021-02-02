import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    monitoredMatches: [],
    liveMatches: [],
    test: null
}
export const monitorSlice = createSlice({
    name: 'monitor',
    initialState: initialState,
    reducers: {
        addToInplay(state, {payload:match}) {
            state.liveMatches.push(match)
        },
        addToMonitored(state, {payload:match}) {
            state.monitoredMatches.push(match)
        },
        updateMatch(state, {payload:updated}) {
            state.monitoredMatches.map(current=>{
                if (current.fifaId === updated.fifaId){
                return updated
                } else {
                    return current
                }
            })
        },

        setTest(state, {payload:variable}) {
            state.test = variable
        },
        updateScore(state, {payload:score}) {
            state.liveMatches.map(m=>{
            if(m.fifaId===score.fifaId){
                m.homeScore = score.homeScore;
                m.awayScore = score.awayScore;
            }
            });
        }
    }
})

export default monitorSlice.reducer
export const {addToInplay, addToMonitored, setTest, updateScore} = monitorSlice.actions