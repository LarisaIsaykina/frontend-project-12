import { useContext } from 'react';
import ChannelContext from '../contexts/channelContext.jsx';

const useChannel = () => useContext(ChannelContext);

export default useChannel;
