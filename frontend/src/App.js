import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
  Navigate,
} from 'react-router-dom';
import useAuth from './hooks/index.jsx';
import { Button, Navbar, Nav } from 'react-bootstrap';


import { useState, useEffect  } from 'react';
import NotFoundErrorPage from './components/NotFoundErrorPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/PrivatePage.jsx';
import AuthContext from './contexts';
import PrivatePage from './components/PrivatePage.jsx';

// import { io } from 'socket.io-client';
import { socket, SocketContext } from './contexts/SocketContext.js';


// export const socket = io();




const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <SocketContext.Provider  value={socket}> 
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
    </SocketContext.Provider>
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login">Log in</Button>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {

  useEffect(() => {

  // socket.on('connect', () => {
  //     setIsConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //   });

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  
    });
    
    socket.on('newChannel', (payload) => {
    console.log(payload) // { id: 6, name: "new channel", removable: true }
    });
  
    socket.on('removeChannel', (payload) => {
    console.log(payload); // { id: 6 };
    });
    socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });
  
  return () => {
    socket.off('connect');
    socket.off('disconnect');
  };
  
  }, []);
  
  
  return (
    <AuthProvider>

    <BrowserRouter>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Hexlet chat</Navbar.Brand>
      <AuthButton />
    </Navbar>


      <Routes>
          <Route path="/login" element={<LoginPage/> } />
          <Route path="*" element={<NotFoundErrorPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
      </Routes>
    </BrowserRouter>
    </AuthProvider>


  );
}


export default App;
