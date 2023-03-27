import React from 'react';
// import AuthContext from './contexts/authContext';

import { Provider } from 'react-redux';
import './index.css';
import i18n from './locales/i18n';
import App from './components/App';
import store from './slices/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import AuthProvider from './components/AuthProvider';

const init = async () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </I18nextProvider>
  );
};


export default init;
