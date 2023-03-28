import React, { useState, useMemo } from 'react';
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
  const memoizedProps = useMemo(() => (props), [props]);
  return <ChosenChannel.Provider value={memoizedProps}>{children}</ChosenChannel.Provider>;
};

export default ChannelProvider;
