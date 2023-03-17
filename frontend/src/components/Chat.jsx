import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFocus from "../hooks/useFocus.jsx";

import { actions as messagesActions } from "../slices/messagesSlice.js";
// import { selectors as messagesSelectors } from "../slices/messagesSlice.js";

// import { fetchMessages } from "../slices/messagesSlice.js";
import { SocketContext } from "../contexts/SocketContext.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useTranslation } from "react-i18next";
import socket from "../socket";
import { selectors } from "../slices/channelsSlice.js";
import * as filter from "leo-profanity";
import getDictionary from "../leoprofanity/dictionary.js";

const Chat = ({ currentChat }) => {
  const { t, i18n } = useTranslation();
  getDictionary();

  // const socket = useContext(SocketContext);
  const auth = useAuth();
  const { username } = auth.currentUser;
  console.log("auth.currentuser", auth.currentUser);

  const [message, setMessage] = useState("");
  const [submitDisabled, setDisabled] = useState(false);
  const [submitError, setError] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  const dispatch = useDispatch();

  const inputRef = useRef();

  const currChannelData = useSelector((s) => {
    console.log("chat id now", currentChat);
    return selectors.selectById(s, currentChat);
  });
  console.log("curr channel data must be {...}", currChannelData);
  console.log("selectors / channel", selectors);

  // const messages = useSelector((s) => selectByChannel(s, currentChat));

  const messages = useSelector((state) => {
    const all = Object.values(state.messages.entities);
    console.log("all", all);
    if (all.length !== 0) {
      return all.filter((i) => i.channelId === currentChat);
    }
    return [];
  });

  useFocus(inputRef, currentChat);

  const handleChangeMessage = (e) => setMessage(e.target.value);

  const handleAddMessage = (e) => {
    setDisabled(true);

    e.preventDefault();
    const filtered = filter.clean(message);

    if (!filtered) {
      return;
    }

    socket.emit(
      "newMessage",
      { body: filtered, channelId: currentChat, username },
      (response) => {
        if (response.status === "ok") {
          setDisabled(false);
          console.log("response", response);
          // dispatch(messagesActions.addMessage(message)); // ?
          // dispatch(fetchMessages());

          setMessage("");
          setError("");
        } else {
          setError("submit failed");
        }
      }
    );
  };

  if (!currChannelData) {
    return null;
  }

  // console.log('messages from store', messages);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            {currChannelData && <b># {currChannelData.name}</b>}
          </p>
          <span className="text-muted">
            {t("messages", { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages &&
            messages.map(({ body, username, id }) => (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>: {body}
              </div>
            ))}
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
              ></input>{" "}
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
                <span className="visually-hidden">{t("btns.sbmt")}</span>
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
