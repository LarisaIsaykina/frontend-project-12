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
import { Button, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";

// import { useState, useEffect } from "react";
import NotFoundErrorPage from "./components/NotFoundErrorPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import AuthContext from "./contexts/authContext";
import PrivatePage from "./components/PrivatePage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import { useTranslation } from "react-i18next";

import { SocketContext } from "./contexts/SocketContext.jsx";
import socket from "./socket";
import useSocket from "./hooks/useSocket";
import useToken from "./hooks/useToken";
import { toast, ToastContainer } from "react-toastify";
// import useFetchData from "./hooks/useFetchData";
import useSimpleFetch from "./hooks/useSimpleFetch";
import getNotifications from "./toast/toast.js";

import React, { useEffect } from "react";
import axios from "axios";
import routes from "./contexts/routes";
import getAuthHeader from "./util/getHeader";
import getNormalized from "./util/getNormalized";
import { actions as usersActions } from "./slices/usersSlice.js";
import { actions as messagesActions } from "./slices/messagesSlice.js";
import { actions as channelsActions } from "./slices/channelsSlice.js";
import { useDispatch, useSelector } from "react-redux";

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  return auth.loggedIn ? (
    <Button onClick={auth.logOut}>{t("btns.logout")}</Button>
  ) : (
    <Button as={Link} to="/login">
      {t("btns.login")}
    </Button>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const Rooter = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  useToken(auth);
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
  const dispatch = useDispatch();
  const [requestErr, setError] = useState(null);
  useSocket();

  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = getAuthHeader();
        console.log("AUTH header", header);
        const { data } = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        console.log("data", data);

        const normalizedData = getNormalized(data);
        console.log("normalizedData", JSON.stringify(normalizedData, null, 2));
        const { channels } = normalizedData.entities;
        const messages = normalizedData.entities.messages ?? {};
        console.log("users, chan , messag for dispatching", channels, messages);
        console.log("!!!dispatch", dispatch);

        // dispatch(usersActions.addUsers(Object.values(users)));
        dispatch(channelsActions.addChannels(Object.values(channels)));
        dispatch(messagesActions.addMessages(Object.values(messages)));
      } catch (e) {
        console.log("e error caught", e);

        setError(e);
        if (e.code === "ERR_NETWORK") {
          console.log("net fail in App");
          getNotifications.netFail();
        }
        throw e;
      }
    };

    fetchData();
  }, []);
  // useSimpleFetch();
  // useFetchData();
  // console.log("loc stor in app", localStorage.getItem("userId"));
  // console.log("auth in app", auth);
  const test = useSelector((s) => {
    console.log("i check redux store", s.channels);
  });

  return (
    <BrowserRouter>
      <Rooter />
    </BrowserRouter>
  );
};

export default App;
