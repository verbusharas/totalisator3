import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: {isFakeMatchesIncluded: false},
}
export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: initialState,
    reducers: {
        includeFakeMatches(state) {
            state.data.isFakeMatchesIncluded = true;
        },

        excludeFakeMatches(state) {
            state.data.isFakeMatchesIncluded = false;
        },
    }
})

export default preferencesSlice.reducer
export const {includeFakeMatches, excludeFakeMatches} = preferencesSlice.actions