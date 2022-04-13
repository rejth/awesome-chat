import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import ChatService from '../services/chatService.js';
import { setData } from '../slices/chatSlice.js';

const service = new ChatService();

function getAuthHeader() {
  const credentials = JSON.parse(localStorage.getItem('credentials'));

  if (credentials && credentials.token) {
    return { Authorization: `Bearer ${credentials.token}` };
  }

  return {};
}

function useChatData() {
  const dispatch = useDispatch();
  const authHeader = getAuthHeader();

  const {
    isLoading,
    isError,
    data,
  } = useQuery('chatData', () => service.getChatData(authHeader));

  if (data) dispatch(setData(data));

  return { isLoading, isError };
}

export default useChatData;
