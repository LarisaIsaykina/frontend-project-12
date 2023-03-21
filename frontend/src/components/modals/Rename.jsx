import React, { useState, useRef } from 'react';
// import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';

import { Modal, FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import getSchema from '../../schemas/add';
import useSelect from '../../hooks/useSelect.jsx';
import { selectors } from '../../slices/channelsSlice.js';
import socket from '../../socket';
import getNotifications from '../../toast/toast.js';
import * as filter from 'leo-profanity';
import getDictionary from '../../leoprofanity/dictionary.js';

const Rename = (props) => {
  getDictionary();
  const { onHide, currChat } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //   const [value, setValue] = useState('');
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');

  const channels = useSelector(selectors.selectAll);
  const currChatData = useSelector((state) =>
    selectors.selectById(state, currChat)
  );
  const { name } = currChatData;

  const chanNames = channels.map(({ name }) => {
    return name;
  });
  const [inputValue, setInputValue] = useState(name);

  const schema = getSchema(chanNames);

  const handleChange = (e) => {
    e.preventDefault();
    setError('');
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);
    try {
      await schema.validate(inputValue);
    } catch (e) {
      // console.log(e);
      setError(e.message);
      setDisabled(false);
      return;
    }

    socket.emit(
      'renameChannel',
      { id: currChat, name: filter.clean(inputValue) },
      (acknowledge) => {
        if (acknowledge.status === 'ok') {
          setDisabled(false);
          dispatch(
            channelsActions.renameChannel({
              id: currChat,
              name: filter.clean(inputValue),
            })
          );
          setInputValue('');
          onHide();
          getNotifications.renamed();
        }

        // else {
        //   if (e.code === "ERR_NETWORK") {
        //     getNotifications.netFail();
        //   }
        setError(t('err.backErr'));
        setDisabled(false);
      }
    );
  };
  const inputRef = useRef();

  useSelect(inputRef, submitError);
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  // useEffect(() => {
  //   inputRef.current.select();
  // }, [submitError]);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chanActions.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup controlId="inputValue">
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

//{/* <input disabled={submitDisabled} type="submit" className="btn btn-primary mt-2" value="submit" />
//{/*<FormControl.Feedback type="invalid">mandatory field</FormControl.Feedback>*/}
