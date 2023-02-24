import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../contexts/routes.js';
import * as yup from 'yup';


const LoginPage = () => {
    // BEGIN (write your solution here)
    const [errors,
      writeError] = useState([]);
   
    const inputRef = useRef();
  
    useEffect(() => {
      inputRef.current.focus();
  
    }, []);
  
  
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const minLength = 6;

    const schema = yup.object({
      username: yup.string().required('Please fill out this field').test({
          test: (value) => value.length >= minLength}),
      password: yup.string().required('Please fill out this field').test({
          test: (value) => value.length  >= minLength}),
    
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
          localStorage.setItem('userId', tokenStr);
          auth.logIn();
          const { from } = location.state ?? { from: { pathname: '/' } }; // если location.state === null
          navigate(from);
  
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
      <form onSubmit={formik.handleSubmit}
      validationSchema={schema}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input ref={inputRef} value={formik.values.username} onChange={formik.handleChange} placeholder="username" name="username" autoComplete="username" required id="username" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input value={formik.values.password} onChange={formik.handleChange} placeholder="password" name="password" autoComplete="current-password" required id="password" className="form-control" type="password" />
          {errors.length > 0 && <div className="text-danger">the username or password is incorrect</div>}
        </div>
        <button type="submit" className="btn btn-outline-primary">Submit</button>
      </form>
    );
    // END
  };
  
  export default LoginPage;