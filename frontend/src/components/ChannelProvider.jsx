import React, { useState } from 'react';
import ChosenChannel from '../contexts/channelContext';

const ChannelProvider = ({ children }) => {
    const defaultChannelId = 1;
    const [currentChannel, setCurrentChannel] = useState(defaultChannelId);

    const setChannel = (id) => setCurrentChannel(id);
    const clearChannel = () => setCurrentChannel(defaultChannelId);

    const props = {
      
        currentChannel,
        setChannel,
        clearChannel,
     };
  return <ChosenChannel.Provider value={props}>{children}</ChosenChannel.Provider>;
};

export default ChannelProvider;
