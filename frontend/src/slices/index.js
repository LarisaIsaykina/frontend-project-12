import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from './messagesSlice.js';
// import usersReducer from '../slices/usersSlice.js';

export default configureStore({
  reducer: {
    // counter – это свойство будет внутри объекта общего состояния: state.counter
    channels: channelsReducer, // state.channels
    messages: messagesReducer,
    // users: usersReducer,
  },
});