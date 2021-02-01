import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    liveMatches: [],
}
export const inplaySlice = createSlice({
    name: 'inplay',
    initialState: initialState,
    reducers: {
        addToInplay(state, {payload:match}) {
            state.liveMatches.push(match)
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


export default inplaySlice.reducer
export const {addToInplay, updateScore} = inplaySlice.actions