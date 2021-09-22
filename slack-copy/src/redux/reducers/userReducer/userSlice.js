import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL , ACCESS_TOKEN_NAME} from "../../../constants"

const initialState = { user: 'unnamed'}
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const res = await axios.get(API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
    return res.data.email
})

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userReducer: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers(builder){
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
});

export const selectUser = state => state.user.value
export const { userReducer } = slice.actions
export default slice.reducer