import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Form, Button, Container, Nav,
} from 'react-bootstrap';

import { useAuth, useChatService } from '../hooks/useContext';

function Login() {
  const auth = useAuth();
  const { service } = useChatService();
  const { t } = useTranslation();
  const history = useHistory();

  const mutation = useMutation(service.loginUser, {
    onSuccess: (data) => {
      auth.login(data);
      history.push('/chat');
      toast.success(t('loginForm.notifications.success'), { duration: 5000, icon: '👌' });
    },
    onError: (error) => {
      let message = error?.statusCode;
      switch (message) {
        case 401:
          message = t('loginForm.errors.userName.userNotExist');
          break;
        default:
          message = t('loginForm.notifications.error');
          break;
      }
      toast.error(message, { duration: 5000, icon: '🤢' });
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, t('loginForm.errors.userName.maxLength'))
        .min(3, t('loginForm.errors.userName.minLength'))
        .required(t('loginForm.errors.userName.required')),
      password: Yup.string()
        .max(16, t('loginForm.errors.password.maxLength'))
        .min(6, t('loginForm.errors.password.minLength'))
        .required(t('loginForm.errors.password.required')),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <section className="login-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header pb-5">{t('loginForm.title')}</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>{t('loginForm.userName')}</Form.Label>
            <Form.Control
              required
              name="username"
              type="text"
              placeholder={t('loginForm.errors.userName.placeholder')}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label>{t('loginForm.password')}</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder={t('loginForm.errors.password.placeholder')}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
          >
            {t('loginForm.loginButton')}
          </Button>

          <Nav.Link
            as={Link}
            to="/signup"
          >
            {t('signUpForm.signUpButton')}
          </Nav.Link>
        </Form>
      </Container>
    </section>
  );
}

export default Login;
