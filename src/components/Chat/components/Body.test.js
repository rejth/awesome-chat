import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, test } from '@jest/globals';

import Body from './Body';
import renderWithStore from '../../../utils/test-utils/renderWithStore.js';

describe('Test Chat body', () => {
  let initialState = {};

  beforeAll(() => {
    initialState = {
      data: {
        currentChannelId: 1,
        channels: [
          { id: 1, name: 'channel', removable: true },
        ],
        messages: [
          { channelId: 1, userId: 1, message: 'hello world' },
        ],
        users: [
          { id: 1, username: 'admin', password: 'admin' },
        ],
      },
    };
  });

  test('Message is sent by clicking on the Send button', async () => {
    renderWithStore(<Body />, { chatReducer: initialState });

    const button = screen.getByTestId('send-msg-btn');
    const input = screen.getByTestId('message-input');
    expect(input).toContainHTML('');
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');

    fireEvent.click(button);
    const message = screen.getByTestId('message');
    expect(message).toBeInTheDocument();
  });
});
