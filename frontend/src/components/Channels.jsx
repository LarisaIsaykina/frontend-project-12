import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from "react-redux";

import cn from 'classnames';
import getModal from './modals/index.js';
// import socket from '../../../App';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import useAuth from '../hooks/useAuth.jsx';
import { selectors } from '../slices/channelsSlice.js';

import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const Channels = ({ setCurrentChannel, state }) => {
  // const [channelsOnPage, setChannels] = useState(null);
  const { t } = useTranslation();

  const btnRef = useRef(null);
  const auth = useAuth();
  // const { username } = auth.currentUser;

  const channels = useSelector(selectors.selectAll);

  const [modalInfo, setModalInfo] = useState({ type: null, id: null });

  const hideModal = () => {
    btnRef.current.focus();

    setModalInfo({ type: null, id: null });
  };

  const showModal = (type, id = null) => setModalInfo({ type, id });

  const renderModal = ({ modalInfo, hideModal }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return (
      <Component
        channels={channels}
        currChat={state}
        modalInfo={modalInfo}
        onHide={hideModal}
        setCurrentChannel={setCurrentChannel}
      />
    );
  };

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('headerChan')}</b>

          <Button
            className="glowing-border"
            ref={btnRef}
            variant="outline-primary"
            onClick={() => showModal('addChat')}
          >
            +
          </Button>
        </div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map(({ name, id, removable }) => {
            const bntClasses = cn('w-100 rounded-0 text-start btn', {
              'btn-secondary': state === id,
            });
            const dropDwnVar = cn({
              secondary: state === id,
            });
            return removable ? (
              <li key={id} className="nav-item w-100">
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    onClick={() => setCurrentChannel(id)}
                    className="text-truncate w-100 rounded-0 text-start"
                    variant={dropDwnVar}
                  >
                      # {name}
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
              <li key={id} className="nav-item w-100">
                <button
                  id={id}
                  onClick={() => setCurrentChannel(id)}
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
