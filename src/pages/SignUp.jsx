import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { Form, Button, Container } from 'react-bootstrap';

import { useAuth, useChatService } from '../hooks/useContext';

function SignUpPage() {
  const { service } = useChatService();
  const auth = useAuth();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  React.useEffect(() => setFocus('username'), [setFocus]);

  const mutation = useMutation(service.signUpUser, {
    onSuccess: (data) => {
      auth.login(data);
      history.push('/chat');
      toast.success('Sign up successful!', { duration: 10000, icon: '👌' });
    },
    onError: (error) => {
      let message = error?.statusCode;
      switch (message) {
        case 409:
          message = 'User name already exists. Please choose different';
          break;
        default:
          message = 'Something went wrong. Try again or contact the support';
          break;
      }
      toast.error(message, { duration: 10000, icon: '🤢' });
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <section className="signup-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header pb-5">Sing up</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
          >
            <Form.Label>User name</Form.Label>
            <Form.Control
              required
              name="username"
              type="text"
              placeholder="Enter your name"
              {...register('username', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Must be 20 characters or less',
                },
              })}
            />
            <div>{errors.name?.message}</div>
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Must be at least 6 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Must be 16 characters or less',
                },
              })}
            />
            <div>{errors.password?.message}</div>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicConfirmPassword"
          >
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              required
              name="confirmedPassword"
              type="password"
              placeholder="Password"
              {...register('confirmedPassword', {
                required: 'Password is required',
                validate: (value) => getValues('password') === value || 'The password is not the same',
              })}
            />
            <div>{errors.confirmedPassword?.message}</div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Sign up
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default SignUpPage;
