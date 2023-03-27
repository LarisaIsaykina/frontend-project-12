import '../App.css';
import React, { useState, useEffect } from 'react';

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
import useAuth from '../hooks/useAuth.jsx';
// import { useState } from "react";

import NotFoundErrorPage from './NotFoundErrorPage.jsx';
import LoginPage from './LoginPage.jsx';
// import AuthContext from "./contexts/authContext";
import PrivatePage from './PrivatePage.jsx';
import SignupPage from './SignupPage.jsx';

import useSocket from '../hooks/useSocket';

import useToken from '../hooks/useToken';

const AuthButton = () => {
  const [routeOpen, setRouteOpen] = useState(false);

  const auth = useAuth();
  const { t } = useTranslation();
  const { loggedIn } = auth;

  const loadingState = useToken(loggedIn);

  useEffect(() => {
    // console.log('loading state at the begginin og useEff', loadingState);
    // console.log('auth at the begginin og useEff', auth);

    if (loadingState === 'pending') {
      setRouteOpen(false);
      return;
    }
    if (loadingState === 'error') {
      setRouteOpen(false);
      return;
    }
    if (loadingState === 'fullfilled' && !auth.loggedIn) {
      setRouteOpen(false);
      return;
    }
    if (loadingState === 'fullfilled' || auth.loggedIn) {
      setRouteOpen(true);
      return;
    }
    setRouteOpen(false);
  }, [loadingState]);

  if (routeOpen) {
    return <Button onClick={auth.logOut}>{t('btns.logout')}</Button>;
  }
  return (
    <Button as={Link} to="/login">
      {t('btns.login')}
    </Button>
  );
};

const PrivateRoute = ({ children }) => {
  // console.log('private');
  const [routeOpen, setRouteOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { loggedIn } = auth;

  const loadingState = useToken(loggedIn);
  useEffect(() => {
    if (loadingState === 'pending') {
      setRouteOpen(false);
      return;
    }
    if (loadingState === 'error') {
      setRouteOpen(false);
      navigate('/login');
      return;
    }
    if (loadingState === 'fullfilled' && !auth.loggedIn) {
      setRouteOpen(false);
      navigate('/login');
      return;
    }
    if (loadingState === 'fullfilled' || auth.loggedIn) {
      setRouteOpen(true);
      return;
    }
    setRouteOpen(false);
  }, [loadingState, navigate]);

  if (routeOpen) {
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
          element={(
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          )}
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
