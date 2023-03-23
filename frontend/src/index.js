// import React, { useState } from 'react';
// import AuthContext from './contexts/authContext';

// import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './locales/i18n';
// import AuthProvider from './components/AuthProvider';'

// import { Provider as RollProvider, ErrorBoundary } from "@rollbar/react";

// same configuration you would create for the Rollbar.js SDK

// const rollbarConfig = {
//   accessToken: "bb77e2024b5c4653b722485fd00c52a3",
//   environment: "testenv",
// };
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
