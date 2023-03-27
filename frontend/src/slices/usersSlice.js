import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),

  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
  },
});

export const { actions } = usersSlice;

export const selectors = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
