import { Link, Outlet, useLocation, useNavigate,  } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import routes from '../contexts/index.jsx'

import { useEffect } from 'react';

const PrivatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   console.log('Current location is ', location);
  //   const locations = ['/', '/login'];

  //   if (!locations.includes(location)) {
  //     navigate('/notFound');
  //   }
  // }, [location, navigate]);

  
  return (
    <>
    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/public">Chat</Nav.Link>
          <Nav.Link as={Link} to="/private">It's Hexlet, babe!</Nav.Link>
        </Nav>
        </Navbar>
      </>
      )
  };


  export default PrivatePage;
