import React, { useState, useEffect, useRef, useContext } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux'

import { Modal, Button } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

// import socket from './../../App';
import { SocketContext } from '../../contexts/SocketContext.js';


const Remove = (props) => {
  const { onHide, currChat } = props;
  const dispatch = useDispatch();
//   const [value, setValue] = useState('');
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState('');
  const socket = useContext(SocketContext);



  const handleSubmit = (e) => {
    e.preventDefault();
    
    setDisabled(true);


    socket.emit('removeChannel', { id: currChat }, acknowledge => {
      if (acknowledge.status === 'ok') {
          setDisabled(false);
          dispatch(channelsActions.removeChannel(currChat));
          onHide();

      } else {

        setError('submission failed!');
        setDisabled(false);

      }
    });
  };
//   const inputRef = useRef();
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);


  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Уверены?
         
          <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Отмена</Button>
          <Button onClick={handleSubmit} type="submit" value="Submit" variant="danger" disabled={submitDisabled}  > Удалить </Button>
          
          {submitError && <Modal.Text>{submitError}</Modal.Text>}

          </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

//{/* <input disabled={submitDisabled} type="submit" className="btn btn-primary mt-2" value="submit" /> 
//{/*<FormControl.Feedback type="invalid">mandatory field</FormControl.Feedback>*/}
