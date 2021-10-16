import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './css/index.css';
import App from './App';

import '@fontsource/cairo';
import '@fontsource/cairo/700.css';
import LocalStorage from './redux/LocalStorage';
// import '@fontsource/roboto';

LocalStorage.store('temp', {
  contacts: [...Array(3)].map((_, i) => {
    const idx = i.toString();
    return {
      contactId: String(idx),
      nickName: `nick${idx}`,
      tags: ['1', '2'],
      givenName: `given${idx}`,
      middleName: `middle${idx}`,
      familyName: `family${idx}`,
      email: `john.doe${idx}@gmail.com`,
      phone: `+61234567${idx}`,
      address: `${idx} Apple Street`,
      description: `${idx}lorem ipsum`,
      note: 'note',
    };
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
