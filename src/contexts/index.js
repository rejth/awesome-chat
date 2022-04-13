import React from 'react';

const AuthContext = React.createContext(null);
const SocketContext = React.createContext(null);
const ChatServiceContext = React.createContext(null);

export {
  AuthContext,
  SocketContext,
  ChatServiceContext,
};
