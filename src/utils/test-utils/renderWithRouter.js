import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import AppRouter from '../../router/AppRouter.jsx';
import AuthProvider from '../../components/AuthProvider/index.jsx';
import { ChatServiceContext } from '../../contexts/index.js';
import BackendEndpoints from '../../api/index.js';

export default function renderWithRouter(component, initialRoute = '/') {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <ChatServiceContext.Provider value={{ api: BackendEndpoints, socket: null }}>
        <AuthProvider>
          <>
            <AppRouter />
            {component}
          </>
        </AuthProvider>
      </ChatServiceContext.Provider>
    </MemoryRouter>
  );
}
