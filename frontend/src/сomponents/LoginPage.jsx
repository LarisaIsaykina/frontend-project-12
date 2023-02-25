import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../contexts/routes.js';
import useAuth from '../hooks/index.jsx';
import { Form, FormControl, FormGroup, FormLabel, Button, Card }  from 'react-bootstrap';

import * as yup from 'yup';


const LoginPage = () => {
    // BEGIN (write your solution here)
    const [errors,
      writeError] = useState([]);
   
    const inputRef = useRef();
  
    useEffect(() => {
      inputRef.current.focus();
  
    }, []);
  
  
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const minLength = 6;

    const schema = yup.object({
      username: yup.string().required('Please fill out this field'),
      // .test({
      //     test: (value) => value.length >= minLength}),
      
      password: yup.string().required('Please fill out this field'),
      // .test({
      //     test: (value) => value.length  >= minLength}),
    
    });
  
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: async ({ username, password }) => {
        try {
          const res = await axios.post(routes.loginPath(), { username, password });
          const { token } = res.data;
  
          // storing input name: "Johname
          const tokenStr = JSON.stringify({ userId: token });
          console.log('token', tokenStr);
          localStorage.setItem('userId', tokenStr);
          auth.logIn();
          // const { from } = location.state ?? { from: { pathname: '/' } }; // если location.state === null
          navigate('/private');
  
        } catch (e) {
          formik.setSubmitting(false);
  
          writeError([...errors,
          e.response.status]);
          if (e.isAxiosError && e.response.status === 401) {
            inputRef.current.select();
  
            return;
          }
          throw e;
        } 
      },
    });
  

    return (
      <>
      <Card style={{ width: '25rem' }}>
        <Card.Title>Войти</Card.Title>
        <Form onSubmit={formik.handleSubmit} validationSchema={schema}>
          <FormGroup className="mb-3" controlId="username">
            <FormLabel>username</FormLabel>
            <FormControl ref={inputRef} onChange={formik.handleChange} value={formik.values.username} type="username" placeholder="Ваш ник" />
    
          </FormGroup>
    
          <FormGroup className="mb-3" controlId="password">
            <FormLabel>password</FormLabel>
            <FormControl value={formik.values.password} onChange={formik.handleChange} type="password" placeholder="Пароль" />
          </FormGroup>
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
    </Card></>
   
    );
    // END
  };
  
  export default LoginPage;




// {/* <header>Войти</header>
//       <form onSubmit={formik.handleSubmit}
//       validationSchema={schema}>
//         <div className="form-group">
//           <label className="form-label" htmlFor="username">Username</label>
//           <input ref={inputRef} value={formik.values.username} onChange={formik.handleChange} placeholder="username" name="username" autoComplete="username" required id="username" className="form-control" />
//         </div>
//         <div className="form-group">
//           <label className="form-label" htmlFor="password">Password</label>
//           <input value={formik.values.password} onChange={formik.handleChange} placeholder="password" name="password" autoComplete="current-password" required id="password" className="form-control" type="password" />
//           {errors.length > 0 && <div className="text-danger">the username or password is incorrect</div>}
//         </div>
//         <button type="submit" className="btn btn-outline-primary">Submit</button>
//       </form></> */}