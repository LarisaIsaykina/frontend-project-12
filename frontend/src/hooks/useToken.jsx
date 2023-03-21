import { useEffect, useState } from 'react';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';
import useAuth from './useAuth';
// import { useNavigate, useLocation } from "react-router-dom";

const useToken = (dependency) => {
  // const navigate = useNavigate();
  const auth = useAuth();

  const [loading, setLoading] = useState('pending');
  console.log('usetoken inside');

  useEffect(() => {
    const token = localStorage.getItem('userId');
    console.log('!! token in useToke useEffect', token);
    if (token) {
      const parsed = JSON.parse(token);
      auth.setUser(parsed);
      auth.logIn(true);
      // navigate("/");

      setLoading('fullfilled');
    } else {
      setLoading('error');
    }
  }, [dependency]);

  console.log('before return loading state');
  console.log('loading before its return', loading);
  return loading;
};
export default useToken;
