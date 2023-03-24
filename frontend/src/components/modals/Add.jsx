import React, { useState, useRef } from 'react';
// import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';

import { Modal, FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import useFocus from '../../hooks/useFocus.jsx';
import getSchema from '../../schemas/add.js';
import socket from '../../socket';
import getNotifications from '../../toast/toast.js';
import * as filter from 'leo-profanity';
import getDictionary from '../../leoprofanity/dictionary.js';

const Add = (props) => {
  getDictionary();
  const { t } = useTranslation();
  const { onHide, setCurrentChannel} = props;
  const dispatch = useDispatch();
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');
  const [inputValue, setInputValue] = useState('');


  const channels = useSelector((state) =>
    Object.values(state.channels.entities)
  ); // обращение к состоянию
  const chanNames = channels.map((channel) => channel.name);
  const schema = getSchema(chanNames);

  const handleChange = (e) => {
    setError('');
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      await schema.validate(inputValue);
    } catch (e) {
      setError(e.message);
      setDisabled(false);
      return;
    }

    socket.emit(
      'newChannel',
      { name: filter.clean(inputValue) },
      (acknowledge) => {
        if (acknowledge.status === 'ok') {
          setDisabled(false);
          dispatch(channelsActions.addChannel(acknowledge.data));
          setInputValue('');
          setCurrentChannel(acknowledge.data.id);
          getNotifications.added();
          onHide();

        }

        setDisabled(false);
      }
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

//{/* <input disabled={submitDisabled} type="submit" className="btn btn-primary mt-2" value="submit" />
//{/*<FormControl.Feedback type="invalid">mandatory field</FormControl.Feedback>*/}
