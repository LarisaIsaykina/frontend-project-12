import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import useAuth from './hooks/useAuth.jsx';
// import { useState } from "react";

// import { useState, useEffect } from "react";
import NotFoundErrorPage from './components/NotFoundErrorPage.jsx';
import LoginPage from './components/LoginPage.jsx';
// import AuthContext from "./contexts/authContext";
import PrivatePage from './components/PrivatePage.jsx';
import SignupPage from './components/SignupPage.jsx';

import useSocket from './hooks/useSocket';
// import useFetchData from "./hooks/useFetchData";
// import getNotifications from "./toast/toast.js";

// import React, { useEffect } from "react";

import useToken from './hooks/useToken';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { loggedIn } = auth;

  const loadingState = useToken(loggedIn);

  if (loadingState === 'pending') {
    return null;
  }
  if (loadingState === 'error') {
    return (
      <Button as={Link} to="/login">
        {t('btns.login')}
      </Button>
    );
  }
  if (loadingState === 'fullfilled' && !auth.loggedIn) {
    return (
      <Button as={Link} to="/login">
        {t('btns.login')}
      </Button>
    );
  }
  if (loadingState === 'fullfilled' || auth.loggedIn) {
    return <Button onClick={auth.logOut}>{t('btns.logout')}</Button>;
  }
  return null;
};

const PrivateRoute = ({ children }) => {
  // console.log('private');

  const navigate = useNavigate();
  const auth = useAuth();
  const { loggedIn } = auth;

  const loadingState = useToken(loggedIn);
  // console.log('!!loading state', loadingState);
  if (loadingState === 'pending') {
    return 'LOADING';
  }
  if (loadingState === 'error') {
    navigate('/login');
    return null;
  }
  if (loadingState === 'fullfilled' && !auth.loggedIn) {
    navigate('/login');
    return null;
  }
  if (loadingState === 'fullfilled' || auth.loggedIn) {
    return children;
  }
  return null;
};

const Rooter = () => {
  const { t } = useTranslation();
  useSocket();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          {t('header1')}
        </Navbar.Brand>
        <AuthButton />
      </Navbar>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundErrorPage />} />
        ;
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <Rooter />
  </BrowserRouter>
);

export default App;
