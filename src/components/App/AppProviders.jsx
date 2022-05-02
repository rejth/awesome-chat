import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

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

const socket = io.connect(server);

function AppProviders({ children }) {
  const serviceSettings = React.useMemo(() => ({ service: new ChatService(), socket }), []);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-right" />
      <StoreProvider store={store}>
        <ChatServiceContext.Provider value={serviceSettings}>
          <AuthProvider>
            <Router>
              {children}
            </Router>
          </AuthProvider>
        </ChatServiceContext.Provider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
