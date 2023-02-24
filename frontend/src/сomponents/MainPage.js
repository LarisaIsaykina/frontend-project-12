import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export const MainPage = () => (

    <>
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
     <hr />
     <Outlet />
     </>
  );