import React from 'react';
import { ErrorBoundary } from '@rollbar/react';
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

const socket = io.connect(API_URL);

function AppProviders({ children }) {
  const serviceSettings = React.useMemo(() => ({ api: BackendEndpoints, socket }), []);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-right" />
      <StoreProvider store={createStore()}>
        <ChatServiceContext.Provider value={serviceSettings}>
          <ErrorBoundary fallbackUI={ErrorIndicator}>
            <AuthProvider>
              <BrowserRouter>
                {children}
              </BrowserRouter>
            </AuthProvider>
          </ErrorBoundary>
        </ChatServiceContext.Provider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
