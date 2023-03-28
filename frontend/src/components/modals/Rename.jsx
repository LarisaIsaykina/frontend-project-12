import React, { useState, useRef } from 'react';
// import _ from "lodash";
import { useSelector } from 'react-redux';

import {
  Modal, FormGroup, FormControl, FormLabel, Form, Button,
} from 'react-bootstrap';
// import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
// import useChannel from '../../hooks/useChannel.jsx';
import * as filter from 'leo-profanity';
import getSchema from '../../schemas/add';
import useSelect from '../../hooks/useSelect.jsx';
import { selectors } from '../../slices/channelsSlice.js';
import socket from '../../socket';
import getNotifications from '../../toast/toast.js';
import getDictionary from '../../leoprofanity/dictionary.js';

const Rename = (props) => {
  getDictionary();
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');

  const channels = useSelector(selectors.selectAll);
  const currChatData = useSelector((state) => selectors.selectById(state, modalInfo.id));

  const chanNames = channels.map(({ name }) => name);
  const [inputValue, setInputValue] = useState(currChatData.name);

  const schema = getSchema(chanNames);

  const handleChange = (e) => {
    e.preventDefault();
    setError('');
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDisabled(true);
    try {
      await schema.validate(inputValue);
    } catch (err) {
      // console.log(e);
      setError(err.message);
      setDisabled(false);
      return;
    }

    socket.emit(
      'renameChannel',
      { id: modalInfo.id, name: filter.clean(inputValue) },
      (acknowledge) => {
        if (acknowledge.status === 'ok') {
          setDisabled(false);
          // dispatch(
          //   channelsActions.renameChannel({
          //     id: currChat,
          //     name: filter.clean(inputValue),
          //   })
          // );
          setInputValue('');
          onHide();
          getNotifications.renamed();
          return;
        }

        setError(t('err.backErr'));
        setDisabled(false);
      },
    );
  };
  const inputRef = useRef();

  useSelect(inputRef, submitError);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chanActions.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup controlId="inputValue">
            <FormLabel className="visually-hidden">Имя канала</FormLabel>

            <FormControl
              ref={inputRef}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={inputValue}
              name="inputValue"
              type="text"
              isInvalid={submitError}
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

export default Rename;
