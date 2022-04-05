import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import AuthProvider from '../AuthProvider';
import store from '../../slices';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-right" />
      <StoreProvider store={store}>
        <AuthProvider>
          <Router>
            {children}
          </Router>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
