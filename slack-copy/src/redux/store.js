import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./reducers/userReducer/userSlice"

export default configureStore({
    reducer: {
        user: userReducer,
    }
})