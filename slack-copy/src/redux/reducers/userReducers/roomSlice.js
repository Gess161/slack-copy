import { createSlice } from "@reduxjs/toolkit"


const initialState = { roomList: [] }
const slice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        roomListReducer: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.roomList = [...action.payload, ...state.roomList].slice(0).reverse()
            } else {
                state.roomList = [action.payload, ...state.roomList].slice(0).reverse()
            }
        },
        deleteRoomReducer: (state, action) => {
            const toDeleteIndex = state.roomList.findIndex(() => action.payload)
            state.roomList.splice(toDeleteIndex - 1, 1)
        }
    },
});


export const { deleteRoomReducer, roomListReducer } = slice.actions
export default slice.reducer