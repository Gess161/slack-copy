import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    messages: {
        room: '',
        messages: []
    }
}
const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messageReducer: (state, action) => {
            state.messages.messages = [action.payload, ...state.messages.messages].slice().reverse()
        }
    }
})

export default slice.reducer
export const { messageReducer } = slice.actions;
