import React from 'react';
import { AuthContext, SocketContext, ChatServiceContext } from '../contexts/index.js';

const useAuth = () => React.useContext(AuthContext);
const useSocket = () => React.useContext(SocketContext);
const useChatService = () => React.useContext(ChatServiceContext);

export { useAuth, useSocket, useChatService };
