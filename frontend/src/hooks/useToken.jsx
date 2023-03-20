import { useEffect, useState } from "react";
import useAuth from "./useAuth";
// import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  // const navigate = useNavigate();
  const auth = useAuth();

  const [loading, setLoading] = useState("pending");

  useEffect(() => {
    const token = localStorage.getItem("userId");
    console.log("!! token", token);
    if (token) {
      const parsed = JSON.parse(token);
      console.log("parsed", parsed);
      auth.setUser(parsed);
      auth.logIn(true);
      // navigate("/");
      setLoading("fullfilled");
    } else {
      setLoading("error");
    }
  }, []);

  return loading;
};
