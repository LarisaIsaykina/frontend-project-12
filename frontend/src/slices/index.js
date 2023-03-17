import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "../slices/channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import usersReducer from "../slices/usersSlice.js";

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    users: usersReducer,
  },
});
