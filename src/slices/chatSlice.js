import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const chatSlice = createSlice({
  name: 'chatData',
  initialState,

  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },

    clear: (state) => {
      state.data = null;
    },

    addChannel: ({ data }, { payload }) => {
      data.currentChannelId = payload.id;
      data.channels.push(payload);
    },

    removeChannel: ({ data }, { payload: id }) => {
      const newChannels = data.channels.filter((channel) => channel.id !== id);
      const newMessages = data.messages.filter((message) => message.channelId !== id);
      data.currentChannelId = data.channels[0].id;
      data.channels = newChannels;
      data.messages = newMessages;
    },

    renameChannel: ({ data }, { payload }) => {
      const { id } = payload;
      const index = data.channels.findIndex((item) => item.id === id);
      const newChannels = [
        ...data.channels.slice(0, index),
        payload,
        ...data.channels.slice(index + 1),
      ];
      data.channels = newChannels;
    },

    addMessage: ({ data }, { payload }) => {
      data.messages.push(payload);
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {
  setData,
  clear,
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
} = chatSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default chatSlice.reducer;
