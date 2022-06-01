import axios from 'axios';
import HttpClient from './HttpClient.js';
import API_URL from './config.js';

const client = axios.create({ baseUrl: `${API_URL}/api/v1` });

function apiClient({ ...options }) {
  const onSuccess = (response) => Promise.resolve(response);
  const onError = (error) => Promise.reject(error);

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

const http = new HttpClient((options) => apiClient(options)
  .then((response) => (response?.statusCode > 299
    ? Promise.reject(response)
    : Promise.resolve(response?.data || {})))
  .catch((error) => Promise.reject(error?.response?.data)));

export default http;
