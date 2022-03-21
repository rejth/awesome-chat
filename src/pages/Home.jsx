import React from 'react';
import { Container } from 'react-bootstrap';

function HomePage() {
  return (
    <section className="home-page">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Welcome to Chat</h1>
      </Container>
    </section>
  );
}

export default HomePage;
