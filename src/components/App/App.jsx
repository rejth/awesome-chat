import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import SignUpPage from '../../pages/SignUp';
import LoginPage from '../../pages/Login';
import HomePage from '../../pages/Home';
import ChatPage from '../../pages/Chat';

import AccessControl from '../AccessControl';
import Navbar from '../Navbar';
import NotFound from '../NotFound';

function App() {
  return (
    <Container className="p-5">
      <Navbar />
      <Switch>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/chat">
          <AccessControl>
            <ChatPage />
          </AccessControl>
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
