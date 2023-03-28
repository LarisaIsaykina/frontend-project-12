import React, { useState, useMemo } from 'react';
import AuthContext from '../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const setUser = (user) => setCurrentUser(user);
  const clearUser = () => setCurrentUser(null);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setCurrentUser(null);
  };

  const props = {
    loggedIn,
    logIn,
    logOut,
    currentUser,
    setUser,
    clearUser,
  };
  const memoizedProps = useMemo(() => (props), [props]);

  return <AuthContext.Provider value={memoizedProps}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
