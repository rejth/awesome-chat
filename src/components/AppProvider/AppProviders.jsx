import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import AuthProvider from '../AuthProvider';
import { ChatServiceContext } from '../../contexts';
import createStore from '../../store';

import API_URL from '../../services/http/config.js';
import BackendEndpoints from '../../api/index.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
  code_version: '1.0.0',
  server: {
    root: API_URL,
    branch: 'main',
  },
};

const socket = io.connect(API_URL);

function AppProviders({ children }) {
  const serviceSettings = React.useMemo(() => ({ api: BackendEndpoints, socket }), []);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-right" />
      <StoreProvider store={createStore()}>
        <ChatServiceContext.Provider value={serviceSettings}>
          <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary fallbackUI={ErrorIndicator}>
              <AuthProvider>
                <BrowserRouter>
                  {children}
                </BrowserRouter>
              </AuthProvider>
            </ErrorBoundary>
          </RollbarProvider>
        </ChatServiceContext.Provider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
