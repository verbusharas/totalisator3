import {createSlice} from "@reduxjs/toolkit";

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

export default totalisatorSlice.reducer
export const {setTotalisator, clearTotalisator} = totalisatorSlice.actions