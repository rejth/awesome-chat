import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Form,
  Tab,
  Col,
  Button,
} from 'react-bootstrap';

import { useChatService } from '../../../hooks/useContext';

function ChatBody() {
  const data = useSelector((state) => state.chatReducer.data);
  const { socket } = useChatService();

  const [messages, setMessages] = React.useState([
    {
      id: 1,
      userId: 1,
      message: 'Здарова, пацаны, как дела?',
    },
    {
      id: 2,
      userId: 2,
      message: 'Вы что не помните, меня вчера убили, мать вашу?',
    },
  ]);

  React.useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((allMessages) => [...allMessages, message]);
    });
  }, [socket]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (newMessage) => {
      socket.emit('newMessage', newMessage);
    },
  });

  return (
    <Col sm={8}>
      <Tab.Content>
        {data.channels.map(({ id }) => (
          <Tab.Pane
            key={id}
            eventKey={`#link${id}`}
          >
            {messages.map(({ message, id: mid }) => (
              <div key={mid}>{ message }</div>
            ))}
          </Tab.Pane>
        ))}

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 mt-5">
            <Form.Control
              type="text"
              name="message"
              placeholder="Type a message"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Send message
          </Button>
        </Form>
      </Tab.Content>
    </Col>
  );
}

export default ChatBody;
