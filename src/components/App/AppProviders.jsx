import React from 'react';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import AuthProvider from '../AuthProvider';

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
      <AuthProvider>
        <Router>
          {children}
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
