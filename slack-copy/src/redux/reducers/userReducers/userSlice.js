import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL , ACCESS_TOKEN_NAME} from "../../../constants"

const initialState = { user: 'unnamed', status: 'idle', socket: null, room: null}
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const res = await axios.get(API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
    return res.data.email
})

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        roomReducer: (state, action) => {
            state.room = action.payload
        },
        socketReducer: (state, action) => {
            state.socket = action.payload
        },
        userReducer: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers(builder){
        builder
        .addCase(fetchUser)
        .addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user = action.payload
        })
        .addCase(fetchUser.rejected,(state,action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        
    }
});

export const selectUser = state => state.user.value
export const { userReducer, socketReducer, roomReducer } = slice.actions
export default slice.reducer