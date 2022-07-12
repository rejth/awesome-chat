/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/App';
import AppProviders from './components/AppProvider/AppProviders';
import './i18n.js';

import '../assets/application.scss';
import '../assets/index.scss';

// Start the mocking and debugging conditionally
// if (process.env.NODE_ENV === 'development') {
//   localStorage.debug = 'chat:*';
//   const { worker } = require('./mocks/browser.js');
//   worker.start();
// }

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('chat'),
);
