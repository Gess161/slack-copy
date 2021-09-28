import { configureStore } from "@reduxjs/toolkit";
import  messageReducer  from "./reducers/userReducers/messagesSlice";
import  roomList  from "./reducers/userReducers/roomSlice";
import  userReducer from "./reducers/userReducers/userSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        room: roomList
    }
})