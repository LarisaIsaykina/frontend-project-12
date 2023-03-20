import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth.jsx";
import { Button, Navbar } from "react-bootstrap";
import { useState } from "react";

// import { useState, useEffect } from "react";
import NotFoundErrorPage from "./components/NotFoundErrorPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
// import AuthContext from "./contexts/authContext";
import PrivatePage from "./components/PrivatePage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import { useTranslation } from "react-i18next";

import useSocket from "./hooks/useSocket";
import { ToastContainer } from "react-toastify";
// import useFetchData from "./hooks/useFetchData";
import getNotifications from "./toast/toast.js";

import React, { useEffect } from "react";

import useToken from "./hooks/useToken";

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const loadingState = useToken();

  if (loadingState === "pending") {
    return "";
  }
  if (loadingState === "error") {
    <Button as={Link} to="/login">
      {t("btns.login")}
    </Button>;
  }
  if (loadingState === "fullfilled" && !auth.loggedIn) {
    <Button as={Link} to="/login">
      {t("btns.login")}
    </Button>;
  }
  if (loadingState === "fullfilled" || auth.loggedIn) {
    return <Button onClick={auth.logOut}>{t("btns.logout")}</Button>;
  }
  return null;
};

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const loadingState = useToken();
  console.log("!!loading state", loadingState);
  if (loadingState === "pending") {
    return "LOADING";
  }
  if (loadingState === "error") {
    navigate("/login");
    return;
  }
  if (loadingState === "fullfilled" && !auth.loggedIn) {
    navigate("/login");
  }
  if (loadingState === "fullfilled" || auth.loggedIn) {
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
          {t("header1")}
        </Navbar.Brand>
        <AuthButton />
      </Navbar>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundErrorPage />} />;
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

const App = () => {
  return (
    <BrowserRouter>
      <Rooter />
    </BrowserRouter>
  );
};

export default App;
