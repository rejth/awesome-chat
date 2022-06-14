import React from 'react';
import { Container } from 'react-bootstrap';

import Navbar from '../Navbar';
import AppRouter from '../../router/AppRouter';

function App() {
  return (
    <Container className="pt-5">
      <Navbar />
      <AppRouter />
    </Container>
  );
}

export default App;
