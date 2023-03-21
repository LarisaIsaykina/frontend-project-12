import { useEffect } from 'react';
import socket from '../socket';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import getNotifications from '../toast/toast';

const useSocket = () => {
  // const messages = useSelector(Object.values(.channels.entities));
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('we connected!');
    });
    socket.on('connect_failed', () => {
      console.log('connect_failed!');

      getNotifications.netFail();
    });
    socket.on('connect_error', () => {
      console.log('connect_error');
      getNotifications.netFail();
    });
    socket.on('disconnect', () => {
      console.log('disconnetc');

      getNotifications.netFail();
    });

    socket.on('reconnect_failed', () => {
      console.log('reconnect_failed!');

      getNotifications.netFail();
    });
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
      console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      // console.log("store messages in listener", messages);
    });

    socket.on('newChannel', (payload) => {
      console.log('listening to new channels!!');
      console.log(payload); // { id: 6, name: "new channel", removable: true }
    });

    socket.on('removeChannel', (payload) => {
      console.log(payload); // { id: 6 };
    });
    socket.on('renameChannel', (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });
  }, []);
};
export default useSocket;
