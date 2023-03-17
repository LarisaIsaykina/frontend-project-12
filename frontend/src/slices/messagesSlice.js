import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as channelsActions } from "./channelsSlice.js";

// import { normalize, schema } from 'normalizr';

const { removeChannel } = channelsActions;

// export const fetchMessages = createAsyncThunk("messages/fetch", async () => {
//   const response = await axios.get(routes.dataPath(), {
//     headers: getAuthHeader(),
//   });
//   return response.data.messages;
// });

const messagesAdapter = createEntityAdapter();

const initState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState: initState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessages: messagesAdapter.removeMany,
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchMessages.pending, (state) => {
    //     state.loadingStatus = "loading";
    //     state.error = null;
    //   })
    //   .addCase(fetchMessages.fulfilled, (state, action) => {
    //     // channelsAdapter.addMany(state, action);
    //     console.log("action.payload in tank fulfiled", action.payload);
    //     console.log("state.messages in tank fulfiled", state.messages);

    //     state.messages = action.payload;
    //     state.loadingStatus = "idle";
    //     state.error = null;
    //   })
    //   .addCase(fetchMessages.rejected, (state, action) => {
    //     state.loadingStatus = "failed";
    //     state.error = action.error;
    //   });
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      // Выбираем все комментарии кроме тех, что нужно удалить
      const restEntities = Object.values(state.entities).filter(
        (e) => e.channelId !== channelId
      );
      // setAll удаляет текущие сущности и добавляет новые
      messagesAdapter.setAll(state, restEntities);
    });
  },
});
// export const selectByChannel = messagesAdapter.getSelectors((state, chanId) =>
//   state.messages.filter((m) => m.channelId === chanId)
// );

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages
);

export default messagesSlice.reducer;
