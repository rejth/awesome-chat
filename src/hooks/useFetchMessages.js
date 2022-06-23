/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import BackendEndpoints from '../api/index.js';
import { setData } from '../store/slices/chatSlice.js';

export const useFetchMessages = () => {
  const dispatch = useDispatch();
  const { getChatData } = BackendEndpoints;

  const { data, isLoading, isError } = useQuery('chatData', () => getChatData());
  if (data) dispatch(setData(data));

  return { data, isLoading, isError };
};
