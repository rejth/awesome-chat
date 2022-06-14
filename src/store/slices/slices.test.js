import { describe, test, expect } from '@jest/globals';
import chatReducer, {
  setData,
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
} from './chatSlice.js';

describe('Test chatReducer slice', () => {
  test('setData reducer', () => {
    const state = { data: {} };
    const payload = {};
    expect(chatReducer(state, setData(payload))).toEqual(state);
  });
  test('addChannel reducer', () => {
    const state = { data: { currentChannelId: null, channels: [] } };
    const payload = { id: 1 };
    const result = chatReducer(state, addChannel(payload));
    expect(result.data.channels).toEqual([payload]);
    expect(result.data.currentChannelId).toBe(1);
  });
  test('removeChannel reducer', () => {
    const state = { data: { channels: [{ id: 1 }], messages: [{ channelId: 1 }] } };
    const result = chatReducer(state, removeChannel(1));
    expect(result.data.channels).toEqual([]);
    expect(result.data.messages).toEqual([]);
  });
  test('renameChannel reducer', () => {
    const state = { data: { channels: [{ id: 1, name: 'channel' }] } };
    const payload = { id: 1, name: 'new' };
    const result = chatReducer(state, renameChannel(payload));
    expect(result.data.channels[0]).toEqual(payload);
  });
  test('addMessage reducer', () => {
    const state = { data: { channels: [{ id: 1 }], messages: [] } };
    const payload = { channelId: 1, message: 'hi' };
    const result = chatReducer(state, addMessage(payload));
    expect(result.data.messages[0]).toEqual(payload);
  });
});
