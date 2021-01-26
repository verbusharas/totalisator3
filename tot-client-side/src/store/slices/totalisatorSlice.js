import {createSlice} from "@reduxjs/toolkit";

const unknownTotalisator = {title:"_Unknown", members:["VIP", "NVIP"]}

export const totalisatorSlice = createSlice({
    name: 'totalisator',
    initialState: unknownTotalisator,
    reducers: {
        open: (state, {payload:totalisator}) => (totalisator),
        close: (state) => (unknownTotalisator)
    }
})

export const {open, close} = totalisatorSlice.actions