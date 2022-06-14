import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

const chatSlice = createSlice({
  name: 'chatReducer',
  initialState,

  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },

    addChannel: (state, { payload }) => {
      state.data.currentChannelId = payload.id;
      state.data.channels.push(payload);
    },

    removeChannel: (state, { payload: id }) => {
      const newChannels = state.data.channels.filter((channel) => channel.id !== id);
      const newMessages = state.data.messages.filter((message) => message.channelId !== id);
      state.data.currentChannelId = state.data.channels[0].id;
      state.data.channels = newChannels;
      state.data.messages = newMessages;
    },

    renameChannel: (state, { payload }) => {
      const { id } = payload;
      const removedChannelIndex = state.data.channels.findIndex((item) => item.id === id);
      state.data.channels = [
        ...state.data.channels.slice(0, removedChannelIndex),
        payload,
        ...state.data.channels.slice(removedChannelIndex + 1),
      ];
    },

    addMessage: (state, { payload }) => {
      state.data.messages.push(payload);
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {
  setData,
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
} = chatSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default chatSlice.reducer;
