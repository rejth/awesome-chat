import React from 'react';
import { Container } from 'react-bootstrap';

import Chat from '../components/Chat';

function ChatPage() {
  return (
    <section className="chat-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Chat />
      </Container>
    </section>
  );
}

export default ChatPage;
