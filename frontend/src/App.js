import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useAuth,
} from 'react-router-dom';
import { NotFoundErrorPage } from './Components/NotFoundErrorPage.jsx';
import { LoginPage } from './Components/LoginPage.jsx';
import MainPage from './Components/MainPage';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/> } />
          <Route path="/login" element={<LoginPage/> } />
          <Route path="/notFound" element={<NotFoundErrorPage />} />
      </Routes>
    </BrowserRouter>
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
