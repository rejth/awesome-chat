import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { Form, Button, Container } from 'react-bootstrap';

import { useAuth, useChatService } from '../hooks/useContext';

function SignUpPage() {
  const { t } = useTranslation();
  const { api } = useChatService();
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

  const mutation = useMutation(api.signUpUser, {
    onSuccess: (data) => {
      auth.login(data);
      history.push('/chat');
      toast.success(t('signUpForm.notifications.success'), { duration: 10000, icon: '👌' });
    },
    onError: (error) => {
      let message = error?.statusCode;
      switch (message) {
        case 409:
          message = t('signUpForm.errors.userName.userExist');
          break;
        default:
          message = t('signUpForm.notifications.error');
          break;
      }
      toast.error(message, { duration: 10000, icon: '🤢' });
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <section className="signup-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header pb-5">{t('signUpForm.title')}</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
          >
            <Form.Label>{t('signUpForm.userName')}</Form.Label>
            <Form.Control
              required
              name="username"
              type="text"
              placeholder={t('signUpForm.errors.userName.placeholder')}
              {...register('username', {
                required: t('signUpForm.errors.userName.required'),
                minLength: {
                  value: 3,
                  message: t('signUpForm.errors.userName.minLength'),
                },
                maxLength: {
                  value: 20,
                  message: t('signUpForm.errors.userName.maxLength'),
                },
              })}
            />
            <div>{errors.name?.message}</div>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label>{t('signUpForm.password')}</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder={t('signUpForm.errors.password.placeholder')}
              {...register('password', {
                required: t('signUpForm.errors.password.required'),
                minLength: {
                  value: 6,
                  message: t('signUpForm.errors.password.minLength'),
                },
                maxLength: {
                  value: 16,
                  message: t('signUpForm.errors.password.maxLength'),
                },
              })}
            />
            <div>{errors.password?.message}</div>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicConfirmPassword"
          >
            <Form.Label>{t('signUpForm.confirmPassword')}</Form.Label>
            <Form.Control
              required
              name="confirmedPassword"
              type="password"
              placeholder={t('signUpForm.errors.password.placeholder')}
              {...register('confirmedPassword', {
                required: t('signUpForm.errors.password.required'),
                validate: (value) => getValues('password') === value || t('signUpForm.errors.password.passwordIsNotSame'),
              })}
            />
            <div>{errors.confirmedPassword?.message}</div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {t('signUpForm.signUpButton')}
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default SignUpPage;
