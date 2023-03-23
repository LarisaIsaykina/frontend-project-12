import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginSchema from '../schemas/login.js';
import useFocus from '../hooks/useFocus.jsx';

import routes from '../contexts/routes.js';
import useAuth from '../hooks/useAuth.jsx';
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
} from 'react-bootstrap';
import getNotifications from '../toast/toast.js';
import avatar from '../images/avatar_login.jpg';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();

  const { t } = useTranslation();

  const inputRef = useRef();
  useFocus(inputRef);
  const navigate = useNavigate();
  const auth = useAuth();
  // console.log('auth in login', auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,

    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);

      // console.log('onsubmit', username, password);

      try {
        const { data } = await axios.post(routes.loginPath(), {
          username,
          password,
        });

        const tokenStr = JSON.stringify(data);

        localStorage.setItem('userId', tokenStr);
        auth.logIn();
        auth.setUser(data);

        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (e) {
        formik.setSubmitting(false);

        if (e.code === 'ERR_NETWORK') {
          getNotifications.netFail();
          return;
        } else if (e.response.status === 401) {
          setAuthFailed(true);

          inputRef.current.select();
          return;
        }

        throw e;
      }
    },
  });

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <Form onSubmit={formik.handleSubmit}>
                  <fieldset disabled={formik.isSubmitting}>
                    <FormGroup className="mb-3" controlId="username">
                      <FormLabel>{t('login.form.nick')}</FormLabel>
                      <FormControl
                        onChange={formik.handleChange}
                        ref={inputRef}
                        value={formik.values.username}
                        type="username"
                        isInvalid={authFailed}
                        placeholder={t('login.form.nick')}
                        required
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.username && formik.errors.username ? (
                          <div className="text-danger">
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </Form.Text>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="password">
                      <FormLabel>{t('login.form.password')}</FormLabel>
                      <FormControl
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={authFailed}
                        type="password"
                        placeholder={t('login.form.password')}
                        required
                      />

                      <Form.Text className="text-danger">
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-danger">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </Form.Text>

                      <Form.Control.Feedback type="invalid">
                        {t('err.login')}
                      </Form.Control.Feedback>
                    </FormGroup>
                    <Button
                      variant="primary"
                      className="w-100 mb-3"
                      type="submit"
                    >
                      {t('login.header')}
                    </Button>
                  </fieldset>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('footer.quest')}</span>{' '}
          <Link as={Link} to="/signup">
            {t('footer.signup')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
