import { createSlice } from "@reduxjs/toolkit";


const initialState = { roomList: [] }
const slice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        roomListReducer: (state, action) => {
            state.roomList = [...state.roomList, action.payload]
        },
        roomAddArrayReducer: (state, action) => {
            state.roomList = [...action.payload]
        }
    },
});


export const { deleteRoomReducer, roomListReducer, roomAddArrayReducer } = slice.actions;
export default slice.reducer;