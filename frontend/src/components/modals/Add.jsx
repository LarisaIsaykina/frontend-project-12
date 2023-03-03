import React, { useState, useEffect, useRef, useContext } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux'

import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, FormText, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

// import socket from './../../App';
import { SocketContext } from '../../contexts/SocketContext.js';




const Add = (props) => {
  const { onHide } = props;
  const dispatch = useDispatch();
//   const [value, setValue] = useState('');
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');
  const [validationFailed, setValidationFailed] = useState(false);
  const socket = useContext(SocketContext);


  const f = useFormik({
    initialValues: {
        channelName: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string().required('Обязательное поле'),
    }),
    onSubmit: ({ channelName }) => {
        setDisabled(true);

        socket.emit('newChannel', { name: channelName }, acknowledge => {
            if (acknowledge.status === 'ok') {
                setDisabled(false);
                dispatch(channelsActions.addChannel(acknowledge.data));
                onHide();


            } else {
                f.setSubmitting(false);

                setError('submission failed!')
            }
        });
    }
});
console.log('formik', f);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  console.log('formik in modal', f);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup controlId="channelName">
            <FormControl
            //   <input
            //   id="firstName"
            //   name="firstName"
            //   type="text"
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   value={formik.values.firstName}
            // />
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.channelName}
              data-testid="channelName"
              name="channelName"
              type="channelName"
              isIvalid={f.validationSchema}
            />
            <FormControl.Feedback type="invalid">mandatory field</FormControl.Feedback>
            <FormText className="text-danger">
              {f.touched.channelName && f.errors.channelName ? (
                <div className="text-danger">{f.errors.channelName}</div>
              ) : null}
            </FormText>


          </FormGroup>
          <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" value="Submit" variant="primary" disabled={submitDisabled}  >Save changes</Button>

          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

//{/* <input disabled={submitDisabled} type="submit" className="btn btn-primary mt-2" value="submit" /> */}
