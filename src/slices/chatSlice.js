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
    addChannel: ({ data }, { payload }) => {
      data.channels.push(payload);
    },
    removeChannel: ({ data }, { payload: id }) => {
      const newChannels = data.channels.filter((item) => item.id !== id);
      data.channels = newChannels;
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
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {
  setData,
  addChannel,
  removeChannel,
  renameChannel,
} = chatSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default chatSlice.reducer;
