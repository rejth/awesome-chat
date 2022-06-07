import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';

import App from './App';

describe('Test app', () => {
  test('Router', () => {
    render(<App />);
    const homeLink = screen.getByTestId('home-link');
    const chatLink = screen.getByTestId('chat-link');

    userEvent.click(homeLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();

    userEvent.click(chatLink);
    expect(screen.getByTestId('chat-page')).toBeInTheDocument();
  });
});
