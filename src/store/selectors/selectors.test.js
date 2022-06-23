import { describe, test, expect } from '@jest/globals';
import { getChatData, getAllChannels } from './index.js';

describe('Test selectors', () => {
  test('getChatData selector', () => {
    expect(getChatData({})).toEqual({});
    expect(getChatData({})).toMatchSnapshot();
  });
  test('getAllChannels selector', () => {
    expect(getAllChannels({})).toEqual([]);
    expect(getAllChannels({})).toMatchSnapshot();
  });
});
