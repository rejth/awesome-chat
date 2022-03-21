import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from '../Login';
import Home from '../../pages/Home';
import NotFound from '../NotFound';

function App() {
  return (
    <Container className="p-5">
      <Router>
        <Switch>
          <Route
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            path="*"
            component={NotFound}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
