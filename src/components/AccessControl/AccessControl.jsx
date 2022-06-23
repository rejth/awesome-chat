import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useContext';

function AccessControl({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.user ? children : (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  );
}

AccessControl.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AccessControl;
