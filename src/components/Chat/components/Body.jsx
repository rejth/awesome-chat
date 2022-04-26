import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Form,
  Tab,
  Col,
  Button,
} from 'react-bootstrap';

import { useChatService, useAuth } from '../../../hooks/useContext';
import { addMessage, removeAllMessage } from '../../../slices/chatSlice';

function ChatBody() {
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

  React.useEffect(() => {
    setFocus('message');
  }, [setFocus]);

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
      channelId: +location.hash.substring(1),
    });
    reset({ message: '' });
  };

  return (
    <Col sm={8}>
      <Tab.Content>
        {data.channels.map(({ id }) => (
          <Tab.Pane
            key={id}
            active={id === +location.hash.substring(1)}
            eventKey={`#${id}`}
          >
            {data.messages
              .filter((item) => item.channelId === id)
              .map(({ message, id: mid }) => (
                <div key={mid}>
                  <strong>{`${user.username}: `}</strong>
                  <span>{message}</span>
                </div>
              ))}
          </Tab.Pane>
        ))}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3 mt-5">
            <Form.Control
              autoFocus
              type="text"
              name="message"
              placeholder="Type a message"
              {...register('message')}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Send message
          </Button>
          {' '}
          <Button
            variant="warning"
            type="submit"
            onClick={() => dispatch(removeAllMessage())}
          >
            Delete all messages
          </Button>
        </Form>
      </Tab.Content>
    </Col>
  );
}

export default ChatBody;
