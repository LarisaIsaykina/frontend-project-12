import axios from "axios";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),

  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //     usersAdapter.addMany(state, action);
  //     state.loadingStatus = "idle";
  //     state.error = null;
  //   });
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
  // },
});
export const { actions } = usersSlice;

export const selectors = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
