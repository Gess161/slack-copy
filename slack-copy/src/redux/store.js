import { configureStore } from "@reduxjs/toolkit";
import  messageReducer  from "./actions/messagesSlice";
import  roomList  from "./actions/roomSlice";
import  userReducer from "./actions/userSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        room: roomList
    }
});