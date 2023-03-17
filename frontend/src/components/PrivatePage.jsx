import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Channels from "./Channels.jsx";
import Chat from "./Chat.jsx";
import useAuth from "../hooks/useAuth.jsx";

import { useTranslation } from "react-i18next";

const PrivatePage = () => {
  const [currentChannel, setCurrentChannel] = useState(1); // какого канала показан чат

  const auth = useAuth();
  console.log("!!!PrivatePage auth", auth);

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
