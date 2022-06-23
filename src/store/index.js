import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';

const rootReducer = combineReducers({
  chatReducer,
});

export default function createStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
