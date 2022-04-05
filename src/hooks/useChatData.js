import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import ChatService from '../services/chatService.js';
import { addData } from '../slices/chatSlice.js';

const service = new ChatService();

function getAuthHeader() {
  const credentials = JSON.parse(localStorage.getItem('credentials'));

  if (credentials && credentials.token) {
    return { Authorization: `Bearer ${credentials.token}` };
  }

  return {};
}

function useChatData() {
  const authHeader = getAuthHeader();
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    data,
  } = useQuery('channels', () => service.getChannels(authHeader));

  React.useEffect(() => {
    if (data) dispatch(addData(data));
  }, [data, dispatch]);

  return {
    isLoading,
    isError,
    data,
  };
}

export default useChatData;
