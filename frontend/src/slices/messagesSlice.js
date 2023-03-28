import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const { removeChannel } = channelsActions;

const messagesAdapter = createEntityAdapter();

const initState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessages: messagesAdapter.removeMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      // Выбираем все комментарии кроме тех, что нужно удалить
      const restEntities = Object.values(state.entities).filter(
        (e) => e.channelId !== channelId,
      );
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);

export default messagesSlice.reducer;
