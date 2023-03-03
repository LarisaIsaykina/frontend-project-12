import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlice.js';
// import { normalize, schema } from 'normalizr';

import routes from '../contexts/routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  console.log('userId', userId);

  if (userId) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchMessages = createAsyncThunk(
  'messages/fetch',
  async () => {
    const response = await axios.get(routes.dataPath(),  { headers: getAuthHeader() } );
    console.log('response in Fetch Messages Thunk', response);
    return response.data.messages;
  },
);

// export const createChannel = createAsyncThunk(
//   'channels/create',
//   async (task) => {
//     const { data } = await axios.post(routes.tasksPath(), task);
//     return data;
//   },
// );

// export const removeChannel= createAsyncThunk(
//   'channels/remove',
//   async (id) => {
//     await axios.delete(routes.removeTaskPath(id));
//     return id;
//   },
// );


  const messagesAdapter = createEntityAdapter();

  const initState = messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null });
  console.log('initState', initState);

  const messagesSlice = createSlice({
    name: 'messages',
    initialState: initState,
    reducers: {
      addMessage: messagesAdapter.addOne,
      addMessages: messagesAdapter.addMany,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMessages.fulfilled, (state, action) => {
          messagesAdapter.addMany(state, action);
          state.loadingStatus = 'idle';
          state.error = null;
          console.log('action', action);
        })
        // .addCase(fetchChannels.fulfilled, (state, action) => {
        //     messagesAdapter.addMany(state, action);
        //     state.loadingStatus = 'idle';
        //     state.error = null;
        //   })
      //   .addCase(sendTask.fulfilled, (state, action) => {
      //     state.tasks.unshift(action.payload);
      //   })
      //   .addCase(removeTask.fulfilled, (state, action) => {
      //     const id = action.payload;
      //     state.tasks = state.tasks.filter((t) => t.id !== id);
      //   });
    },
  });
  export const { addMessage } = messagesSlice.actions;
  
  export const selectors = messagesAdapter.getSelectors((state) => state.messages);
  
  export default messagesSlice.reducer;
  