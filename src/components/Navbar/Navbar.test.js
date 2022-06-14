import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, test, beforeAll } from '@jest/globals';

import Navbar from './Navbar';
import renderWithRouter from '../../utils/test-utils/renderWithRouter.js';

describe('NAVBAR TEST', () => {
  beforeAll(() => {
    localStorage.setItem(
      'credentials',
      JSON.stringify({ token: 'access-token', username: 'admin' }),
    );
  });

  test('Logo link', async () => {
    render(renderWithRouter(<Navbar />));
    const logoLink = screen.getByTestId('logo-link');
    await userEvent.click(logoLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('Home link', async () => {
    render(renderWithRouter(<Navbar />));
    const homeLink = screen.getByTestId('home-link');
    await userEvent.click(homeLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('Chat link', async () => {
    render(renderWithRouter(<Navbar />));
    const chatLink = screen.getByTestId('chat-link');
    await userEvent.click(chatLink);
    expect(screen.getByTestId('chat-page')).toBeInTheDocument();
  });

  test('Logout link', async () => {
    render(renderWithRouter(<Navbar />));
    const logoutBtn = screen.getByTestId('logout-btn');
    await userEvent.click(logoutBtn);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
