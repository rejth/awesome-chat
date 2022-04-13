import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button, Container } from 'react-bootstrap';

import { useAuth, useChatService } from '../hooks/useContext';

function Login() {
  const auth = useAuth();
  const { service } = useChatService();
  const history = useHistory();

  const mutation = useMutation(service.loginUser, {
    onSuccess: (data) => {
      auth.login(data);
      history.push('/chat');
      toast.success('Login successful!', { duration: 5000, icon: '👌' });
    },
    onError: (error) => {
      let message = error?.statusCode;
      switch (message) {
        case 401:
          message = 'User does not exists. Please sign up';
          break;
        default:
          message = 'Something went wrong. Try again or contact the support';
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
        .max(32, 'Must be 32 characters or less')
        .min(2, 'Must be at least 2 characters')
        .required('Name is required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .min(4, 'Must be at least 4 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <section className="login-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header pb-5">Sing in</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>User name</Form.Label>
            <Form.Control
              required
              name="username"
              type="text"
              placeholder="Enter your name"
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
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
            Log in
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default Login;
