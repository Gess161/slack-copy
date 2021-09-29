import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages: []
}
const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messageReducer: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.messages = [...state.messages, ...action.payload]
            } else {
                state.messages = [...state.messages, action.payload]
            };
        },
        initialMessageReducer: (state, action) => {
            state.messages = [];
        },
    }
})

export default slice.reducer
export const { messageReducer, initialMessageReducer } = slice.actions;
