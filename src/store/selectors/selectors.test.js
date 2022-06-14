import { describe, test, expect } from '@jest/globals';
import { getChatData, getAllChannels } from './index.js';

describe('Test selectors', () => {
  test('getChatData selector', () => {
    expect(getChatData({})).toEqual({});
  });
  test('getAllChannels selector', () => {
    expect(getAllChannels({})).toEqual([]);
  });
});
