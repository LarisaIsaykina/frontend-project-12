import { Link, Outlet, useLocation, useNavigate,  } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';


import axios from 'axios';
import routes from '../contexts/index.jsx';
import Channels from './ChannelList.jsx';
import Chat from './Chat.jsx';

import { fetchChannels } from '../slices/channelsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [currentChannel, setCurrentChannel] = useState(1); // какого канала показан чат




  
  return (
    <>
    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">It's Hexlet, babe!</Nav.Link>
        </Nav>
        </Navbar>
        <div className="row h-100 bg-white flex-md-row"> <Channels state={currentChannel} setCurrentChannel={setCurrentChannel} /><Chat currentChat={currentChannel} />
        </div>
      </>
      )
  };


  export default PrivatePage;
