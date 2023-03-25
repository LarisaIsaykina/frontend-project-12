import React, { useState, useContext } from 'react';
// import _ from "lodash";
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import useChannel from '../../hooks/useChannel.jsx';
import socket from '../../socket';
import getNotifications from '../../toast/toast.js';

const Remove = (props) => {
  const { onHide,  modalInfo } = props;

  console.log('modalInfo in rename', modalInfo);

  const { t } = useTranslation();
    const { currentChannel,
        setChannel,
        clearChannel } =  useChannel();  //   const [value, setValue] = useState('');
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');
  // const socket = useContext(SocketContext);

  const handleSubmit = () => {
    setDisabled(true);

    socket.emit('removeChannel', { id: modalInfo.id }, (acknowledge) => {
      if (acknowledge.status === 'ok') {
        setDisabled(false);
        // dispatch(channelsActions.removeChannel(modalInfo.id));
        clearChannel();
        onHide();
        getNotifications.removed();
      }
      // else {
      //   if (e.code === "ERR_NETWORK") {
      //     getNotifications.netFail();
      //   }
      else {
        setError(t('err.backErr'));
        setDisabled(false);
      }
    });
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chanActions.rmv')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('chanActions.rmvConf')}
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('btns.cancel')}
          </Button>
          <Form onClick={handleSubmit}>
            <Button
              type="submit"
              value="Submit"
              variant="danger"
              disabled={submitDisabled}
            >
              {' '}
              {t('btns.rmv')}{' '}
            </Button>
          </Form>

          {submitError && <Modal.Text>{submitError}</Modal.Text>}
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
