import http from '../services/http/index.js';
import API_URL from '../services/http/config.js';

const BASE_ENDPOINT = `${API_URL}/api/v1`;

export default {
  signUpUser(data) {
    return http.post(`${BASE_ENDPOINT}/signup`, data);
  },

  loginUser(data) {
    return http.post(`${BASE_ENDPOINT}/login`, data);
  },

  getChatData() {
    return http.get(`${BASE_ENDPOINT}/data`);
  },
};
