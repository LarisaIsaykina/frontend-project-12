import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default (authData) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token) {
      const parsed = JSON.parse(token);
      console.log("parsed", parsed);
      authData.setUser(parsed);
      authData.logIn(true);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
};
