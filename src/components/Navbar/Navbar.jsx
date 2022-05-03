import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';

import { useAuth } from '../../hooks/useContext';

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    auth.user
      ? (
        <Button
          as={Link}
          to="/login"
          onClick={auth.logout}
        >
          {t('header.logoutButton')}
        </Button>
      )
      : (
        <Button
          as={Link}
          to="/login"
          state={{ from: location }}
        >
          {t('header.loginButton')}
        </Button>
      )
  );
}

function NavBar() {
  const { t } = useTranslation();
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="rounded-3"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          {t('header.logo')}
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/home"
          >
            {t('header.home')}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/chat"
          >
            {t('header.chat')}
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
