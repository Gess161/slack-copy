import { createSlice } from "@reduxjs/toolkit";

const initialState = { roomList: [] }
const slice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomList: (state, action) => {
            state.roomList = [...action.payload]
        },
        addRoom: (state, action) => {
            state.roomList = [...state.roomList, action.payload]
        },
    },
});


export const { setRoomList, addRoom } = slice.actions;
export default slice.reducer;