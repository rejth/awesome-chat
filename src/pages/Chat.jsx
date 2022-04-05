import React from 'react';
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

function ChatPage() {
  const { isLoading, isError, data } = useChatData();

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
                    Messages
                  </Tab.Pane>
                ))}

                <Form>
                  <Form.Group className="mb-3 mt-5">
                    <Form.Control type="text" placeholder="Type a message" />
                  </Form.Group>
                  <Button variant="primary">
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
