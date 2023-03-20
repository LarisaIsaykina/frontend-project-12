import { useEffect, useState } from "react";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import useAuth from "./useAuth";
// import { useNavigate, useLocation } from "react-router-dom";

const useToken = () => {
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
  }, [auth]);

  return loading;
};
export default useToken;
