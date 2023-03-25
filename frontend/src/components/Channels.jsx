import React, { useState, useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from "react-redux";

import cn from 'classnames';
import getModal from './modals/index.js';
// import socket from '../../../App';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import useChannel from '../hooks/useChannel.jsx';
import { selectors } from '../slices/channelsSlice.js';

import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const Channels = () => {
  // const [channelsOnPage, setChannels] = useState(null);
  const { currentChannel,
        setChannel,
        clearChannel } =  useChannel();

  console.log('current channel', currentChannel);



  const { t } = useTranslation();
  
  const [addBtnPressed, setBtnPressed] = useState(false);

  const btnRef = useRef();

  const channels = useSelector(selectors.selectAll);
  const ids = useSelector(selectors.selectIds);


  useEffect(() => {
    if (!ids.includes(currentChannel)) {
      clearChannel();
    }
  }, [channels]);

  const lastIndex = channels.length - 1;

  const [modalInfo, setModalInfo] = useState({ type: null, id: null });

  const hideModal = () => {
    setModalInfo({ type: null, id: null });
    setBtnPressed(true);

  };

  const lastElRef = useRef();

  const scrollToBottom = () => {
    lastElRef.current.scrollIntoView();
  };


  useEffect(() => {
    if (lastElRef.current) {
      scrollToBottom();
    }
  }, [channels]);

  useEffect(() => {
    btnRef.current.focus();
    setBtnPressed(false);
    
  }, [addBtnPressed]);



  const showModal = (type, id = null) => setModalInfo({ type, id });

  const renderModal = ({ modalInfo, hideModal }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return (
      <Component
        channels={channels}
        modalInfo={modalInfo}
        onHide={hideModal}
        // setCurrentChannel={setCurrentChannel}
      />
    );
  };

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('headerChan')}</b>

          <Button
            autoFocus
            className="glowing-border"
            tabIndex="1"
            ref={btnRef}
            variant="outline-primary"
            onClick={() => showModal('addChat')}
          >
            +
          </Button>
        </div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 h-100 d-block overflow-auto"
        >
          {channels.map(({ name, id, removable }, index) => {
            const liClass = cn('nav-item w-100', {
            })
            
            const bntClasses = cn('w-100 rounded-0 text-start btn', {
              'btn-secondary': currentChannel === id,
            });
            const dropDwnVar = cn({
              secondary: currentChannel === id,
            });
            const currentRef = (index === lastIndex) ? lastElRef : null;

            return removable ? (
              <li key={id} className={liClass} ref={currentRef} >
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    onClick={() => setChannel(id)}
                    className="text-truncate w-100 rounded-0 text-start"
                    variant={dropDwnVar}
                  >
                  <span className="me-1">#</span>
                  {name}
                  </Button>

                  <Dropdown.Toggle
                    className="flex-grow-0 rounded-0 text-start"
                    split
                    variant={dropDwnVar}
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item
                      id={id}
                      onClick={() => showModal('removeChat', id)}
                    >
                      {t('dropDwn.rmv')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      id={id}
                      onClick={() => showModal('renameChat', id)}
                    >
                      {t('dropDwn.rnm')}
                    </Dropdown.Item>{' '}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li key={id} className={liClass}  ref={currentRef}>
                <button
                  id={id}
                  onClick={() => setChannel(id)}
                  type="button"
                  className={bntClasses}
                >
                  <span className="me-1">#</span>
                  {name}
                </button>
              </li>
            );
          })}{' '}
          {renderModal({ modalInfo, hideModal })}
        </ul>
      </div>
    </>
  );
};

export default Channels;


// overflow-auto
// { block: "end", behavior: "smooth" }