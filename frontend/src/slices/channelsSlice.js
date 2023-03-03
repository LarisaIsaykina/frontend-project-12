import axios from 'axios';
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

import routes from '../contexts/routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  console.log('userId', userId);

  if (userId) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

// const getNormalized = (data) => {

// }

export const fetchChannels = createAsyncThunk(
  'channels/fetch',
  async () => {
    const response = await axios.get(routes.dataPath(),  { headers: getAuthHeader() } );
    console.log('response in Fetch Channels Thunk', response);
    // const { channels } = response.data;
    // const normieData = getNormalized(data);
    // console.log('normieData', normieData);
    // return normieData;
    return response.data.channels;

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
const channelsAdapter = createEntityAdapter();
const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchChannels.pending, (state) => {
      state.loadingStatus = 'loading';
      state.error = null;
    })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      // .addCase(fetchChannels.fulfilled, (state, action) => {
      //   channelsAdapter.addOne(state, action);
      //   state.loadingStatus = 'idle';
      //   state.error = null;
      // })
    //   .a
    //   .addCase(sendTask.fulfilled, (state, action) => {
    //     state.tasks.unshift(action.payload);
    //   })
    //   .addCase(removeTask.fulfilled, (state, action) => {
    //     const id = action.payload;
    //     state.tasks = state.tasks.filter((t) => t.id !== id);
    //   });
  },
});
export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
