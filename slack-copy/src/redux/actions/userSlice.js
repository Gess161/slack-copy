import { createSlice } from "@reduxjs/toolkit"
import { fetchUser } from "../thunk/fetchUser"

const initialState = {
    user: 'Unnamed',
    email: "No-email",
    userList: [],
    status: 'idle',
    socket: null,
    image: "uploads\\profile-image.svg",
    roomId: 'general',
    roomName: 'general',
    sendTo: ''
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        setRoomName: (state, action) => {
            state.roomName = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload.user
            state.email = action.payload.email
            state.image = action.payload.img
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
                state.user = action.payload.username
                state.email = action.payload.email
                state.image = action.payload.image
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});


export const { setSocket, setRoomId, setRoomName, setStatus, setUser } = slice.actions;
export default slice.reducer;