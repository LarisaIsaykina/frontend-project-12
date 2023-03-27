import { useEffect } from 'react';
import socket from '../socket';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelActions } from '../slices/channelsSlice.js'
import getNotifications from '../toast/toast';

const useSocket = () => {
  // const messages = useSelector(Object.values(.channels.entities));
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect');
    socket.on('connect_failed', () => {
      // console.log('connect_failed!');

      getNotifications.netFail();
    });
    socket.on('connect_error', () => {
      // console.log('connect_error');
      getNotifications.netFail();
    });
    socket.on('disconnect', () => {

      getNotifications.netFail();
    });

    socket.on('reconnect_failed', () => {
      getNotifications.netFail();
    });
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
      // console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      // console.log("store messages in listener", messages);
    });

    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelActions.removeChannel(payload.id));

    });
    socket.on('renameChannel', (payload) => {
      dispatch(
        channelActions.renameChannel(payload));
    });
  }, []);
};
export default useSocket;
