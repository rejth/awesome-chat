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
import ChatService from '../../services/chatService';
import { ChatServiceContext } from '../../contexts';
import store from '../../slices';
import server from '../../services/config.js';

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
    root: server,
    branch: 'main',
  },
};

const socket = io.connect(server);

function AppProviders({ children }) {
  const serviceSettings = React.useMemo(() => ({ service: new ChatService(), socket }), []);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-right" />
      <StoreProvider store={store}>
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
