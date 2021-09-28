import { createSlice } from "@reduxjs/toolkit"


const initialState = { roomList: [] }
const slice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        roomListReducer: (state, action) => {
            state.roomList = [action.payload, ...state.roomList].slice(0).reverse()
        },
    },
});


export const { roomListReducer } = slice.actions
export default slice.reducer