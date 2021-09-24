import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./reducers/userReducer/userSlice"
import loginReducer from "./reducers/loginReducer/loginReducer";

export default configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
    }
})