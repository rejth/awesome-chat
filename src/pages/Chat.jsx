import React from 'react';
import { io } from 'socket.io-client';
import { useFormik } from 'formik';
import {
  Container,
  Form,
  Tab,
  Row,
  Col,
  ListGroup,
  Button,
} from 'react-bootstrap';

import useChatData from '../hooks/useChatData';

const socket = io.connect('http://127.0.0.1:3000');

function ChatPage() {
  const { isLoading, isError, data } = useChatData();
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
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (newMessage) => {
      socket.emit('newMessage', newMessage);
    },
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error</span>;

  return (
    <section className="chat-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header mb-5">Welcome to Chat page</h1>
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="#link1"
        >
          <Row>
            <Col sm={4}>
              <ListGroup>
                {data.channels.map(({ id, name }) => (
                  <ListGroup.Item
                    key={id}
                    action
                    href={`#link${id}`}
                  >
                    {name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col sm={8}>
              <Tab.Content>
                {data.channels.map(({ id }) => (
                  <Tab.Pane key={id} eventKey={`#link${id}`}>
                    {messages.map(({ message, id: mid }) => (
                      <div key={mid}>{ message }</div>
                    ))}
                  </Tab.Pane>
                ))}

                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3 mt-5">
                    <Form.Control
                      type="text"
                      placeholder="Type a message"
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Form>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </section>
  );
}

export default ChatPage;
