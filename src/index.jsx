import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './i18n.js';

import App from './components/App';
import AppProviders from './components/App/AppProviders';

import '../assets/application.scss';
import '../assets/index.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('chat'),
);
