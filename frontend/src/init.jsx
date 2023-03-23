import React, { useState } from 'react';
// import AuthContext from './contexts/authContext';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';
import store from './slices/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import AuthProvider from './components/AuthProvider';
// import { Provider as RollProvider, ErrorBoundary } from "@rollbar/react";

// same configuration you would create for the Rollbar.js SDK

// const rollbarConfig = {
//   accessToken: "bb77e2024b5c4653b722485fd00c52a3",
//   environment: "testenv",
// };
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default init;
