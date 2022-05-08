import React from 'react';
import { AuthContext, ChatServiceContext } from '../contexts/index.js';

const useAuth = () => React.useContext(AuthContext);
const useChatService = () => React.useContext(ChatServiceContext);

export { useAuth, useChatService };
