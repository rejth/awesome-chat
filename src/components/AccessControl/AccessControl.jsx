import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';

import { useAuth } from '../AuthProvider/AuthProvider';

function AccessControl({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.user ? children : (
      <Redirect
        to="/login"
        state={{ from: location }}
      />
    )
  );
}

AccessControl.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AccessControl;
