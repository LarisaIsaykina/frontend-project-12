import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import { useRouteError } from "react-router-dom";

const NotFoundErrorPage = () => {
  // const error = useRouteError();

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   if (userId) {
  //     // const foundUser = JSON.parse(loggedInUser);
  //     auth.logIn();
  //   }
  // }, []);
  // const { loggedIn, logIn, logOut, currentUser, setCurrentUser } = auth;
  // console.log("loggedIn", loggedIn);
  // console.log("currentUser", currentUser);
  const auth = useAuth();

  const { t } = useTranslation();
  return (
    <>
      <title>{t("404")}</title>
      <div>
        <header4>{t("404")}</header4>
      </div>
    </>
  );
};

export default NotFoundErrorPage;
