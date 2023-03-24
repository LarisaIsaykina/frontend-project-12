import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFocus from '../hooks/useFocus.jsx';

// import { selectors as messagesSelectors } from "../slices/messagesSlice.js";

// import { fetchMessages } from "../slices/messagesSlice.js";
// import { SocketContext } from "../contexts/SocketContext.jsx";
import useAuth from '../hooks/useAuth.jsx';
import socket from '../socket';
import { selectors } from '../slices/channelsSlice.js';
import * as filter from 'leo-profanity';
import getDictionary from '../leoprofanity/dictionary.js';
import { useTranslation } from 'react-i18next';

const Chat = ({ currentChat }) => {
  const { t } = useTranslation();
  getDictionary();

  const auth = useAuth();
  const userData = auth.currentUser || null;

  const [message, setMessage] = useState('');
  const [submitDisabled, setDisabled] = useState(false);
  const [submitError, setError] = useState('');

  const inputRef = useRef();
  const lastElRef = useRef();
  useFocus(inputRef);
  
  useFocus(inputRef, currentChat);

  const currChannelData = useSelector((s) => {
    return selectors.selectById(s, currentChat);
  });

  const messages = useSelector((state) => {
    const allMessages = Object.values(state.messages.entities);
    if (allMessages) {
      return allMessages.filter((i) => i.channelId === currentChat);
    }
    return [];
  });
  const lastIndex = messages.length - 1;

    const scrollToBottom = () => {
    lastElRef.current.scrollIntoView();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (lastElRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const handleChangeMessage = (e) => setMessage(e.target.value);

  const handleAddMessage = (e) => {
    if (!message) {
      return;
    }
    setDisabled(true);

    e.preventDefault();
    const censoredMessage = filter.clean(message);

    socket.emit(
      'newMessage',
      {
        body: censoredMessage,
        channelId: currentChat,
        username: userData.username,
      },
      (response) => {
        if (response.status === 'ok') {
          setDisabled(false);

          setMessage('');
          setError('');
        } else {
          setError('submit failed');
          setDisabled(false);
        }
      }
    );
  };

  if (!userData) {
    return null;
  }

  if (!currChannelData) {
    return null;
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            {currChannelData && <b># {currChannelData.name}</b>}
          </p>
          <span className="text-muted">
            {t('messages', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages &&
            messages.map(({ body, username, id }, index) => {
              const currentRef = (index === lastIndex) ? lastElRef : null;


              return (<div ref={currentRef} key={id} className="text-break mb-2">
                <b>{username}</b>: {body}
              </div>
          )})}
        </div>
        <div className="mt-auto px-5 py-3">
          <form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={handleAddMessage}
          >
            <div className="input-group has-validation">
              <input
                ref={inputRef}
                onChange={handleChangeMessage}
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value={message}
                disabled={submitDisabled}
              ></input>{' '}
              <button
                type="submit"
                value="Submit"
                disabled={submitDisabled}
                className="btn btn-group vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">{t('btns.sbmt')}</span>
              </button>
            </div>
            {submitError && (
              <div className="invalid-feedback">{submitError}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
