import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Form,
  Tab,
  Col,
  Button,
  Alert,
} from 'react-bootstrap';

import { useChatService, useAuth } from '../../../hooks/useContext';
import { addMessage } from '../../../slices/chatSlice';

function ChatBody() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector((state) => state.chatReducer.data);

  const { socket } = useChatService();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
  } = useForm();

  React.useEffect(() => setFocus('message'), [setFocus]);

  React.useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      if (!newMessage.message) return;
      dispatch(addMessage(newMessage));
    });
  }, [socket, dispatch]);

  const onSubmit = (newMessage) => {
    if (!newMessage.message) return;
    socket.emit('newMessage', {
      ...newMessage,
      userId: user?.username,
      channelId: +location.hash.substring(1) || 1,
    });
    reset({ message: '' });
  };

  return (
    <Col sm={9} className="p-3 bg-white rounded-3">
      <div className="chat-page__body">
        <Tab.Content>
          {data.channels.map(({ id }) => (
            <Tab.Pane
              key={id}
              active={id === +location.hash.substring(1) || (!location.hash && id === 1)}
              eventKey={`#${id}`}
            >
              {!data.messages
                .filter((item) => item.channelId === id)
                .length && (
                <Alert variant="success">
                  <Alert.Heading>{t('chatBody.noMessages')}</Alert.Heading>
                </Alert>
              )}
              {data.messages
                .filter((item) => item.channelId === id)
                .map(({ userId, message, id: mid }) => (
                  <div key={mid} className="pb-2">
                    <strong>{`${userId}: `}</strong>
                    <span>{message}</span>
                  </div>
                ))}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 mt-5">
          <Form.Control
            autoFocus
            type="text"
            name="message"
            placeholder={t('chatBody.sendMessageButton.placeholder')}
            {...register('message')}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {t('chatBody.sendMessageButton.title')}
        </Button>
      </Form>
    </Col>
  );
}

export default ChatBody;
