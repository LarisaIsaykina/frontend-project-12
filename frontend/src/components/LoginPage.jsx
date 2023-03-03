import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../contexts/routes.js';
import useAuth from '../hooks/index.jsx';
import { Form, FormControl, FormGroup, FormLabel, Button, Card, Container }  from 'react-bootstrap';

import * as Yup from 'yup';


const LoginPage = () => {
    // BEGIN (write your solution here)
    const [authFailed, setAuthFailed] = useState(false);

    const [errors,
      writeError] = useState([]);
   
    const inputRef = useRef();

    useEffect(() => {
      inputRef.current.focus();
  
    }, []);
  
    useEffect(() => {
      inputRef.current.focus();
  
    }, [errors]);


    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: Yup.object({
        username: Yup.string().required('Please fill out this field'),
  
        password: Yup.string().required('Please fill out this field'),
      }),
    
      onSubmit: async ({ username, password }) => {
        setAuthFailed(false);

        try {
          const res = await axios.post(routes.loginPath(), { username, password });
          const { token } = res.data;
  
          // storing input name: "Johname
          const tokenStr = JSON.stringify({ token });
          localStorage.setItem('userId', tokenStr);
          auth.logIn();
          // const { from } = location.state ?? { from: { pathname: '/' } }; // если location.state === null
          navigate('/');
  
        } catch (e) {
          formik.setSubmitting(false);
  
          
          if (e.isAxiosError && e.response.status === 401) {
            inputRef.current.select();
            setAuthFailed(true);
  
            return;
          }
          throw e;
        } 
      },
    });
console.log('formik in login page', formik);

      // <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    return (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">

        <Form onSubmit={formik.handleSubmit} >
        <fieldset disabled={formik.isSubmitting}>

          <FormGroup className="mb-3" controlId="username">
            <FormLabel>username</FormLabel>
            <FormControl onChange={formik.handleChange} ref={inputRef} value={formik.values.username} type="username" isInvalid={authFailed}
 placeholder="Ваш ник" />
            <Form.Text className="text-danger">
              {formik.touched.username && formik.errors.username ? (
                <div className="text-danger">{formik.errors.username}</div>
              ) : null}
            </Form.Text>
 
          </FormGroup>
    
          <FormGroup  className="mb-3" controlId="password">
            <FormLabel>password</FormLabel>
            <FormControl value={formik.values.password} onChange={formik.handleChange} isInvalid={authFailed}
 type="password" placeholder="Пароль" />
            <Form.Text className="text-danger">
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </Form.Text>
            <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>

          </FormGroup>
          <Button variant="primary" className="w-100 mb-3" type="submit" >
            Войти
          </Button>
          </fieldset>

        </Form>
        </div>
        </div>
        </div>
        </div>
        </div>
    
    )
 
  };
  
  export default LoginPage;
