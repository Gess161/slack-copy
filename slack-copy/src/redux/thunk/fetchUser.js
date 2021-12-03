import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) }});
    return res.data;
});