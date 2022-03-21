import React from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext(null);
export const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  const [user, setUser] = React.useState(credentials || null);

  const login = (userData) => {
    localStorage.setItem('credentials', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('credentials');
    setUser(null);
  };

  const contextValue = React.useMemo(() => (
    { user, login, logout }
  ), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
