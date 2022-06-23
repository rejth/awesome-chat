import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { beforeAll, describe, test } from '@jest/globals';

import Body from './Body';
import Sidebar from './Sidebar';
import renderWithStore from '../../../utils/test-utils/renderWithStore.js';

describe('Test Chat sidebar', () => {
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

  test('Modal is opened by clicking on Add button', async () => {
    renderWithStore(<Sidebar />, { chatReducer: initialState });
    const addChannelBtn = screen.getByTestId('add-channel-btn');
    await userEvent.click(addChannelBtn);
    expect(screen.getByTestId('add-channel-modal')).toBeInTheDocument();
  });

  test('Messages are fetched by clicking on the channel', async () => {
    renderWithStore(<Sidebar />, { chatReducer: initialState });
    const channelLink = screen.getByTestId('channel-link');

    await userEvent.click(channelLink);
    renderWithStore(<Body />, { chatReducer: initialState });
    const message = screen.getByTestId('message');
    expect(message).toBeInTheDocument();
  });
});
