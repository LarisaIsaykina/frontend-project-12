import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// export const fetchChannels = createAsyncThunk("channels/fetch", async () => {
//   const response = await axios.get(routes.dataPath(), {
//     headers: getAuthHeader(),
//   });
//   console.log("response in Fetch Channels Thunk", response);
//   // const { channels } = response.data;
//   // const normieData = getNormalized(data);
//   // console.log('normieData', normieData);
//   // return normieData;
//   return response.data.channels;
// });

const channelsAdapter = createEntityAdapter();
const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.upsertOne,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchChannels.pending, (state) => {
  //       state.loadingStatus = "loading";
  //       state.error = null;
  //     })
  //     .addCase(fetchChannels.fulfilled, (state, action) => {
  //       channelsAdapter.addMany(state, action);
  //       state.loadingStatus = "idle";
  //       state.error = null;
  //     })
  //     .addCase(fetchChannels.rejected, (state, action) => {
  //       state.loadingStatus = "failed";
  //       state.error = action.error;
  //     });
  // },
});
export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);

export default channelsSlice.reducer;
