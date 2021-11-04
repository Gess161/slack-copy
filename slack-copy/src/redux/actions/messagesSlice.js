import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
};
const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        initiateMessages: (state, action) => {
            state.messages = [];
        },
        replaceMessages: (state, action) => {
            state.messages = [...action.payload]
        }
    }
});

export default slice.reducer;
export const { setMessages, initiateMessages, replaceMessages } = slice.actions;
