import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

import getNotifications from '../toast/toast.js';

import routes from '../contexts/routes';
import getAuthHeader from '../util/getHeader';
import getNormalized from '../util/getNormalized';
// import { actions as usersActions } from "./slices/usersSlice.js";
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import ChannelProvider from './ChannelProvider.jsx';

const PrivatePage = () => {
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
        if (e.code === 'ERR_NETWORK') {
          getNotifications.netFail();
          return;
        }
        throw e;
      }
    };

    fetchData();
  }, []);

  return (
    <ChannelProvider>
      <div className="row h-100 bg-white flex-md-row overflow-hidden">
        {' '}
        <Channels />
        <Chat />
      </div>
    </ChannelProvider>
  );
};

export default PrivatePage;
