import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Channels from "./Channels.jsx";
import Chat from "./Chat.jsx";
import useAuth from "./../hooks/useAuth.jsx";

// import useToken from "./../hooks/useToken";
// import useFetchData from "./hooks/useFetchData";
import getNotifications from "./../toast/toast.js";

import axios from "axios";
import routes from "./../contexts/routes";
import getAuthHeader from "./../util/getHeader";
import getNormalized from "./../util/getNormalized";
import { useDispatch } from "react-redux";
// import { actions as usersActions } from "./slices/usersSlice.js";
import { actions as messagesActions } from "./../slices/messagesSlice.js";
import { actions as channelsActions } from "./../slices/channelsSlice.js";

const PrivatePage = () => {
  const [currentChannel, setCurrentChannel] = useState(1); // какого канала показан чат
  const [error, setError] = useState(""); //

  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = getAuthHeader();
        console.log("AUTH header", header);
        const { data } = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        console.log("data", data);

        const normalizedData = getNormalized(data);
        console.log("normalizedData", JSON.stringify(normalizedData, null, 2));
        const { channels } = normalizedData.entities;
        const messages = normalizedData.entities.messages ?? {};
        console.log("users, chan , messag for dispatching", channels, messages);
        console.log("!!!dispatch", dispatch);

        // dispatch(usersActions.addUsers(Object.values(users)));
        dispatch(channelsActions.addChannels(Object.values(channels)));
        dispatch(messagesActions.addMessages(Object.values(messages)));
      } catch (e) {
        console.log("e error caught", e);

        setError(e);
        if (e.code === "ERR_NETWORK") {
          console.log("net fail in App");
          getNotifications.netFail();
        }
        throw e;
      }
    };

    fetchData();
  }, []);

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
