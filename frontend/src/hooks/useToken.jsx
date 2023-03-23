import { useEffect, useState } from 'react';
import useAuth from './useAuth';
// import { useNavigate, useLocation } from "react-router-dom";

const useToken = (dependency) => {
  // const navigate = useNavigate();
  const auth = useAuth();
  const token = localStorage.getItem('userId');

  const [loading, setLoading] = useState('pending');
  // const [isLoggedIn, setIsLoggedIn] = useState(dependency);

  useEffect(() => {
    if (token) {
      const parsed = JSON.parse(token);
      auth.setUser(parsed);
      auth.logIn(true);
      // setIsLoggedIn(true);

      setLoading('fullfilled');
    } else {
      // setIsLoggedIn(false);

      setLoading('error');
    }
  }, [dependency]);

  // console.log('before return loading state');
  // console.log('loading before its return', loading);
  return loading;
};
export default useToken;
