import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

import AuthProvider from '../../components/AuthProvider/index.jsx';
import { ChatServiceContext } from '../../contexts/index.js';

import store from '../../store/index.js';
import BackendEndpoints from '../../api/index.js';

function AllTheProviders({ children }) {
  const serviceSettings = React.useMemo(() => ({ api: BackendEndpoints, socket: null }), []);
  return (
    <StoreProvider store={store}>
      <ChatServiceContext.Provider value={serviceSettings}>
        <AuthProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </AuthProvider>
      </ChatServiceContext.Provider>
    </StoreProvider>
  );
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override @testing-library/react render method
export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.element.isRequired,
};
