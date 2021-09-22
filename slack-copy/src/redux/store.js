import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer/userSlice"

export default configureStore({
    user: 'unnamed',
    reducer: {
        user: userReducer,
    }
})