import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFakeMatchesIncluded: false,
}
export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: initialState,
    reducers: {
        includeFakeMatches(state) {
            state.isFakeMatchesIncluded = true;
        },

        excludeFakeMatches(state) {
            state.isFakeMatchesIncluded = false;
        },
    }
})

export default preferencesSlice.reducer
export const {includeFakeMatches, excludeFakeMatches} = preferencesSlice.actions