import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData.jsx";
import Channels from "./Channels.jsx";
import Chat from "./Chat.jsx";
import useAuth from "../hooks/useAuth.jsx";

import { useTranslation } from "react-i18next";

const PrivatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const [currentChannel, setCurrentChannel] = useState(1); // какого канала показан чат

  const auth = useAuth();
  console.log("!!!PrivatePage auth", auth);

  const { t } = useTranslation();

  return (
    <>
      {/* <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            {t("header1")}
          </Nav.Link>
        </Nav>
      </Navbar> */}
      <div className="row h-100 bg-white flex-md-row">
        {" "}
        <Channels
          state={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
        <Chat currentChat={currentChannel} />
      </div>
    </>
  );
};

export default PrivatePage;
