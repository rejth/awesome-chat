import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const chatSlice = createSlice({
  name: 'chatData',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addData } = chatSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default chatSlice.reducer;
