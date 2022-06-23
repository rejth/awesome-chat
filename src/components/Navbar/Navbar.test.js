import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import {
  describe,
  test,
  beforeAll,
  beforeEach,
} from '@jest/globals';

import Navbar from './Navbar';
import renderWithStore from '../../utils/test-utils/renderWithStore.js';
import { useFetchMessages } from '../../hooks/useFetchMessages.js';

jest.mock('../../hooks/useFetchMessages', () => ({
  useFetchMessages: jest.fn(),
}));

describe('Test navigation bar routes', () => {
  const initialState = {
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

  beforeEach(() => {
    useFetchMessages.mockImplementation(() => ({}));
  });

  beforeAll(() => {
    localStorage.setItem(
      'credentials',
      JSON.stringify({ token: 'access-token', username: 'admin' }),
    );
  });

  test('Logo link', async () => {
    renderWithStore(<Navbar />);
    const logoLink = screen.getByTestId('logo-link');

    await userEvent.click(logoLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('Home link', async () => {
    renderWithStore(<Navbar />);
    const homeLink = screen.getByTestId('home-link');

    await userEvent.click(homeLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('Chat link', async () => {
    useFetchMessages.mockImplementation(() => ({
      ...initialState,
      isError: false,
      isLoading: false,
    }));

    renderWithStore(<Navbar />, { chatReducer: initialState });
    const chatLink = screen.getByTestId('chat-link');

    await userEvent.click(chatLink);
    expect(screen.getByTestId('chat-page')).toBeInTheDocument();
  });

  test('Logout link', async () => {
    renderWithStore(<Navbar />);
    const logoutBtn = screen.getByTestId('logout-btn');

    await userEvent.click(logoutBtn);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
