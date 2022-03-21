import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';

import { useAuth } from '../AuthProvider/AuthProvider';

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.user
      ? <Button onClick={auth.logout}>Log out</Button>
      : (
        <Button
          as={Link}
          to="/login"
          state={{ from: location }}
        >
          Log in
        </Button>
      )
  );
}

function NavBar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          React Chat
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/home"
          >
            Home
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/chat"
          >
            Chat
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <AuthButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
