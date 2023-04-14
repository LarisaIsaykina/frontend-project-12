import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, FormGroup, FormControl, Form, FormLabel, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import useFocus from '../../hooks/useFocus.jsx';
import useChannel from '../../hooks/useChannel.jsx';
import getSchema from '../../schemas/add.js';
import socket from '../../socket';
import getNotifications from '../../toast/toast.js';
import getDictionary from '../../leoprofanity/dictionary.js';

const Add = (props) => {
  getDictionary();
  const { t } = useTranslation();
  const { onHide } = props;
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { setChannel } = useChannel();

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const chanNames = channels.map((channel) => channel.name);
  console.log('channames', chanNames);
  const schema = getSchema(chanNames);

  const handleChange = (e) => {
    setError('');
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    try {
      await schema.validate(inputValue);
    } catch (error) {
      setError(error.message);
      setDisabled(false);
      return;
    }

    socket.emit(
      'newChannel',
      { name: filter.clean(inputValue) },
      (acknowledge) => {
        if (acknowledge.status === 'ok') {
          setDisabled(false);
          // dispatch(channelsActions.addChannel(acknowledge.data));
          setInputValue('');
          setChannel(acknowledge.data.id);
          getNotifications.added();
          onHide();
          return;
        }

        setDisabled(false);
      },
    );
  };
  const inputRef = useRef();
  useFocus(inputRef, submitError);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chanActions.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup controlId="channelName">
            <FormLabel className="visually-hidden">Имя канала</FormLabel>
            <FormControl
              ref={inputRef}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={inputValue}
              name="channelName"
              type="text"
              isInvalid={!!submitError}
              disabled={submitDisabled}
            />

            {submitError ? (
              <div className="text-danger">{submitError}</div>
            ) : null}
          </FormGroup>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              {t('btns.cancel')}
            </Button>
            <Button
              type="submit"
              value="Submit"
              variant="primary"
              disabled={submitDisabled}
            >
              {t('btns.sbmt')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
