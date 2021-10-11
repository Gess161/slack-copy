import { createSlice } from "@reduxjs/toolkit"
import { fetchUser } from "../../thunk/fetchUser"

const initialState = { user: 'Unnamed', userList: [], status: 'idle', socket: null, roomId: 'general', roomName: 'general', sendTo: '' }
const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        statusReducer: (state, action) => {
            state.status = action.payload
        },
        roomIdReducer: (state, action) => {
            state.roomId = action.payload
        },
        roomNameReducer: (state, action) => {
            state.roomName = action.payload
        },
        socketReducer: (state, action) => {
            state.socket = action.payload
        },
        userReducer: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser)
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});


export const { 
    sendToReducer, 
    statusReducer, 
    userReducer,
    userListReducer, 
    socketReducer, 
    roomIdReducer, 
    roomNameReducer, } = slice.actions;
export default slice.reducer;