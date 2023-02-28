import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
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

  const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
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
        })
        // .addCase(fetchMessages.fulfilled, (state, action) => {
        //     messagesAdapter.addOne(state, action);
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
  export const { actions } = messagesSlice;
  
  export const selectors = messagesAdapter.getSelectors((state) => state.tasks);
  
  export default messagesSlice.reducer;
  