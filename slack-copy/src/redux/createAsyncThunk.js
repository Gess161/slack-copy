// import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"
// import { API_BASE_URL , ACCESS_TOKEN_NAME} from "../constants"

// const initialState = {
//     user: '',
// }
// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//     const res = await axios.get(API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
//     return res.data.email
// })