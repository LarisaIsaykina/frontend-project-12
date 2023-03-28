import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import routes from '../contexts/routes.js';
import useAuth from '../hooks/useAuth.jsx';

import useFocus from '../hooks/useFocus.jsx';
import signupSchema from '../schemas/signup.js';
import getNotifications from '../toast/toast.js';
import avatar from '../images/avatar_signup.jpg';

const SignupPage = () => {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [signupError, setSignupError] = useState('');
  const { t } = useTranslation();

  const inputRef = useRef();

  useFocus(inputRef);

  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,

    onSubmit: async ({ username, password }) => {
      setSignupError('');

      setSubmitDisabled(true);

      try {
        const res = await axios.post(routes.signup(), {
          username,
          password,
        });

        const tokenStr = JSON.stringify(res.data);
        localStorage.setItem('userId', tokenStr);
        auth.logIn();
        auth.setUser(res.data);
        navigate('/');
      } catch (e) {
        formik.setSubmitting(false);
        setSubmitDisabled(false);
        if (e.code === 'ERR_NETWORK') {
          getNotifications.netFail();
          return;
        } if (e.response.status === 409) {
          inputRef.current.select();
          setSignupError(t('err.signup'));
          return;
        } setSignupError(e.message);
        throw e;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 com-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={avatar} className="rounded-circle" alt="Войти" />
            </div>
            <h1>{t('signup.header')}</h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group
                md="3"
                controlId="username"
                className="position-relative"
              >
                <Form.Label>{t('signup.form.name')}</Form.Label>
                <Form.Control
                  ref={inputRef}
                  type="text"
                  placeholder={t('signup.form.placeHld2')}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  isInvalid={
                    (!!formik.errors.username && !!formik.touched.username)
                    || !!signupError
                  }
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                md="3"
                controlId="password"
                className="position-relative"
              >
                <Form.Label>{t('signup.form.password')}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t('signup.form.placeHld')}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={
                    (!!formik.errors.password && !!formik.touched.password)
                    || signupError
                  }
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                md="3"
                controlId="confirmPassword"
                className="position-relative"
              >
                <Form.Label>{t('signup.form.confirm')}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t('signup.form.placeHld')}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  isInvalid={
                    (!!formik.errors.confirmPassword
                      && !!formik.touched.confirmPassword)
                    || signupError
                  }
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.confirmPassword || signupError}
                </Form.Control.Feedback>
              </Form.Group>

              <Button disabled={submitDisabled} type="submit">
                {t('signup.form.sbmt')}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
