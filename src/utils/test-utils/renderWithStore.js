/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as StoreProvider } from 'react-redux';
import { render } from '@testing-library/react';
import { io } from 'socket.io-client';

import { ChatServiceContext } from '../../contexts/index.js';
import BackendEndpoints from '../../api/index.js';

import AuthProvider from '../../components/AuthProvider/index.jsx';
import AppRouter from '../../router/AppRouter.jsx';
import createStore from '../../store';
import API_URL from '../../services/http/config.js';

const queryClient = new QueryClient();

export default function renderWithStore(
  component,
  initialState = {},
  initialRoute = '/',
) {
  const socket = io.connect(API_URL);
  return render(
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={createStore(initialState)}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <ChatServiceContext.Provider value={{ api: BackendEndpoints, socket }}>
            <AuthProvider>
              <>
                <AppRouter />
                {component}
              </>
            </AuthProvider>
          </ChatServiceContext.Provider>
        </MemoryRouter>
      </StoreProvider>
    </QueryClientProvider>,
  );
}
