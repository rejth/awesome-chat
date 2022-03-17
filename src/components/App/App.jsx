import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../Login';
import NotFound from '../NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={Login}
        />
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="*"
          component={NotFound}
        />
      </Switch>
    </Router>
  );
}

export default App;
