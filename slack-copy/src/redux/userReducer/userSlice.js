import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: 'unnamed' }
export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userReducer: (state, action) => {
            state.user = action.payload
        },
    },
});

export const selectUser = state => state.user.value
export const { userReducer } = slice.actions
export default slice.reducer