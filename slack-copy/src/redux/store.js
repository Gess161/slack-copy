import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./reducers/userReducers/userSlice"

export default configureStore({
    reducer: {
        user: userReducer,
    }
})