import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import './css/index.css';
import App from './App';

import '@fontsource/cairo';
import '@fontsource/cairo/700.css';
// import '@fontsource/roboto';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
