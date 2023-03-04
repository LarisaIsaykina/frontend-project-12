// import React, { useState, useEffect, useRef, useContext } from 'react';
// import _ from 'lodash';
// import { useDispatch } from 'react-redux'

// import { useFormik } from 'formik';
// import { Modal, FormGroup, FormControl, FormText, FormLabel, Form, Button } from 'react-bootstrap';
// import * as Yup from 'yup';
// import { actions as channelsActions } from '../../slices/channelsSlice.js';

// // import socket from './../../App';
// import { SocketContext } from '../../contexts/SocketContext.js';



// const Add = (props) => {
//   const { onHide } = props;
//   const dispatch = useDispatch();
// //   const [value, setValue] = useState('');
//   const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
//   const [submitError, setError] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const socket = useContext(SocketContext);


//   const schema = Yup.string().required('Обязательное поле');

//   const handleChange = (e) => {
//     setError('');
//     setInputValue(e.target.value);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setDisabled(true);
//     try {
//       await schema.validate(inputValue);
//     } catch (e) {
//       console.log(e);
//       setError(e.message);
//       setDisabled(false);
//       return;
//     }


//     socket.emit('newChannel', { name: inputValue }, acknowledge => {
//       if (acknowledge.status === 'ok') {
//           setDisabled(false);
//           dispatch(channelsActions.addChannel(acknowledge.data));
//           setInputValue('');
//           onHide();


//       } else {
//         setError('submission failed!');
//         setDisabled(false);

//       }
//     });
//   };
//   const inputRef = useRef();
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);


//   return (
//     <Modal show>
//       <Modal.Header closeButton onHide={onHide}>
//         <Modal.Title>Добавить канал</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form noValidate onSubmit={handleSubmit}>
//           <FormGroup controlId="channelName">

//             <FormControl
   
//               ref={inputRef}
//               onChange={handleChange}
//               // onBlur={handleBlur}
//               value={inputValue}
//               name="channelName"
//               type="text"
//               isInvalid={!!submitError}
//             />

//          {submitError ? (
//                 <div className="text-danger">{submitError}</div>
//               ) : null}

//           </FormGroup>
 
//           <Modal.Footer>
//           <Button variant="secondary" onClick={onHide}>Close</Button>
//           <Button type="submit" value="Submit" variant="primary" disabled={submitDisabled}  >Save changes</Button>

//           </Modal.Footer>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default Add;

// //{/* <input disabled={submitDisabled} type="submit" className="btn btn-primary mt-2" value="submit" /> 
// //{/*<FormControl.Feedback type="invalid">mandatory field</FormControl.Feedback>*/}
