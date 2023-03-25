import React, { useState, useEffect } from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

import getNotifications from './../toast/toast.js';

import axios from 'axios';
import routes from './../contexts/routes';
import getAuthHeader from './../util/getHeader';
import getNormalized from './../util/getNormalized';
import { useDispatch } from 'react-redux';
// import { actions as usersActions } from "./slices/usersSlice.js";
import { actions as messagesActions } from './../slices/messagesSlice.js';
import { actions as channelsActions } from './../slices/channelsSlice.js';
import ChannelProvider from './ChannelProvider.jsx';

const PrivatePage = () => {
  // const [currentChannel, setCurrentChannel] = useState(1); // какого канала показан чат
  const [error, setError] = useState(''); //

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });

        const normalizedData = getNormalized(data);
        // console.log('normalizedData', JSON.stringify(normalizedData, null, 2));
        const { channels } = normalizedData.entities;
        const messages = normalizedData.entities.messages ?? {};

        dispatch(channelsActions.addChannels(Object.values(channels)));
        dispatch(messagesActions.addMessages(Object.values(messages)));
      } catch (e) {
        setError(e);
        if (e.code === 'ERR_NETWORK') {
          getNotifications.netFail();
        }
        throw e;
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <ChannelProvider>
      <div className="row h-100 bg-white flex-md-row overflow-hidden">
        {' '}
        <Channels
          // state={currentChannel}
          // setCurrentChannel={setCurrentChannel}
        />
        <Chat 
        // currentChat={currentChannel} 
        />
      </div>
      </ChannelProvider>
    </>
  );
};

export default PrivatePage;
