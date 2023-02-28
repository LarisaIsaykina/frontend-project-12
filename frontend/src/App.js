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


import { useState  } from 'react';
import NotFoundErrorPage from './components/NotFoundErrorPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/PrivatePage.jsx';
import AuthContext from './contexts';
import PrivatePage from './components/PrivatePage.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
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
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
