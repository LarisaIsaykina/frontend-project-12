import ChannelContext from '../contexts/channelContext.jsx';
import { useContext } from 'react';

const useChannel = () => useContext(ChannelContext);

export default useChannel;