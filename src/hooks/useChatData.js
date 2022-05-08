import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import BackendEndpoints from '../api/index.js';
import { setData } from '../slices/chatSlice.js';

function useChatData() {
  const dispatch = useDispatch();
  const { getChatData } = BackendEndpoints;

  const { isLoading, isError, data } = useQuery('chatData', () => getChatData());
  if (data) dispatch(setData(data));

  return { data, isLoading, isError };
}

export default useChatData;
