import axios from 'axios';

export default class ChatService {
  _baseUrl = 'http://127.0.0.1:3000/api/v1';

  fetchData = async (url, method, data, authHeader) => {
    const response = await axios({
      method,
      url: `${this._baseUrl}${url}`,
      headers: authHeader,
      data,
    });

    if (response.statusCode > 204) {
      return Promise.reject(response);
    }

    return response.data;
  };

  signUpUser = async (userData) => {
    try {
      return await this.fetchData('/signup', 'post', userData);
    } catch (error) {
      return Promise.reject(error.response?.data);
    }
  };

  loginUser = async (userData) => {
    try {
      return await this.fetchData('/login', 'post', userData);
    } catch (error) {
      return Promise.reject(error.response?.data);
    }
  };

  getChatData = async (authHeader) => {
    try {
      return await this.fetchData('/data', 'get', {}, authHeader);
    } catch (error) {
      return Promise.reject(error.response?.data);
    }
  };
}
