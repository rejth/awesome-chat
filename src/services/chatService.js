import axios from 'axios';

export default class ChatService {
  _baseUrl = 'http://127.0.0.1:3000/api/v1';

  fetchData = async (url, method, data) => {
    const response = await axios({
      method,
      url: `${this._baseUrl}${url}`,
      data,
    });

    if (response.statusCode > 204) {
      return Promise.reject(response);
    }

    return response.data;
  };

  loginUser = async (userData) => {
    try {
      const user = await this.fetchData('/login', 'post', userData);
      return user;
    } catch (error) {
      return Promise.reject(error.response?.data);
    }
  };
}
