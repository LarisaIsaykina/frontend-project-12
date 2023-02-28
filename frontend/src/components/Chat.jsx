import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { fetchMessages } from '../slices/messagesSlice.js';
// import { addMessage } from '../slices/messagesSlice.js'

const Chat = ({ currentChat, }) => {
    const [channelsOnPage, setChannels] = useState(null);
    const [message, setMessage] = useState('');
    const [submitDisabled, setDisabled] = useState(false);
    const [submitError, setError] = useState('');

    const dispatch = useDispatch();
    const socket = io.connect('http://localhost:3000/', 
    {'reconnection': true});


    useEffect(() => {

        console.log('use effect before socket on');

        socket.on('newMessage', (payload) => {
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }

      });
    }, [socket]);



    useEffect(() => {
        dispatch(fetchMessages()); // запрос на получение с сервера каналов
    }, [dispatch, socket]);


    const handleChangeMessage = (e) => setMessage(e.target.value);


    const handleAddMessage = (e) => {
        e.preventDefault();
        setDisabled(true);
        console.log('socket', socket);
        

        socket.emit('newMessage', { body: message, channelId: currentChat, username: 'admin' }, acknowledge => {
            if (acknowledge.status === 'ok') {
                setDisabled(false);
                setMessage('');
                setError('');
            } else {
                setError('submit failed');
            }
        });
    }
   

  

    const messages = useSelector((state) => Object.values(state.messages.entities));

    // console.log('messages from store', messages);
    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b># {currentChat }</b>
                    </p><span className="text-muted">{messages.length} сообщения</span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                        {messages && messages.map(({ body }) => (
                            <div className="text-break mb-2"><b>admin</b>:{body}</div>
                        ))}
                        </div>
                        <div className="mt-auto px-5 py-3">
                            <form noValidate className="py-1 border rounded-2"  onSubmit={handleAddMessage}>
                                <div className="input-group has-validation">

                                <input onChange={handleChangeMessage} name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={message}></input> <button type="submit" value="Submit" disabled={submitDisabled}  className="btn btn-group vertical"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg><span className="visually-hidden">Отправить</span></button>
                                </div>
                                {submitError && <div className="invalid-feedback">{submitError}</div>}
                            </form>
                        </div>
                        </div>
                        </div>
    )
};

export default Chat;
