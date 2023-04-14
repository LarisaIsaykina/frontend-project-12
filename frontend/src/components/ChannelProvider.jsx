import React, { useState, useMemo } from 'react';
import ChosenChannel from '../contexts/channelContext';

const ChannelProvider = ({ children }) => {
  const defaultChannelId = 1;
  const [currentChannelId, setCurrentChannel] = useState(defaultChannelId);

  const setChannel = (id) => setCurrentChannel(id);
  const setDefaulChannel = () => setCurrentChannel(defaultChannelId);

  const props = {

    currentChannelId,
    setChannel,
    setDefaulChannel,
  };
  const memoizedProps = useMemo(() => (props), [props]);
  return <ChosenChannel.Provider value={memoizedProps}>{children}</ChosenChannel.Provider>;
};

export default ChannelProvider;
