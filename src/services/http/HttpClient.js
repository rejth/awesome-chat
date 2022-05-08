export default class HttpClient {
  fetch = fetch;

  constructor(fetchFunction) {
    this.fetch = fetchFunction || fetch;
  }

  get(url, data) {
    const urlWithData = HttpClient.getUrlWithData(url, data);
    return this.sendRequest('get', urlWithData);
  }

  post(url, body) {
    return this.sendRequest('post', url, body);
  }

  put(url, body) {
    return this.sendRequest('put', url, body);
  }

  delete(url, data) {
    const urlWithData = HttpClient.getUrlWithData(url, data);
    return this.sendRequest('delete', urlWithData, null);
  }

  sendRequest(method, url, data) {
    const options = HttpClient.getRequestOptions(method, url);
    const optionsWithBody = HttpClient.getOptionsWithBody(options, data);
    return this.fetch(optionsWithBody);
  }

  static getRequestOptions(method, url) {
    const accessToken = HttpClient.getAccessToken();
    if (accessToken) {
      return {
        url,
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    return {
      url,
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  }

  static getAccessToken() {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (!credentials || !credentials?.token) return null;
    return credentials.token;
  }

  static getOptionsWithBody(options, data) {
    return data
      ? { ...options, data }
      : options;
  }

  // при использовании Fetch API необходимо преобразовывать body в строку
  // и отправлять {...options, body: '{ key: value }'}
  static getDataLikeString(data) {
    if (!data) return data;
    if (typeof data === 'object') return JSON.stringify(data);
    if (typeof data.toString === 'function') return data.toString();
    return data;
  }

  static getUrlWithData(url, data) {
    if (!data || typeof data !== 'object') return url;

    const formattedUrl = url.includes('?') ? `${url}&` : `${url}?`;
    const parameters = Object
      .entries(data)
      .filter((item) => (item[1] || item[1] === 0 || item[1] === false))
      .map(([key, value]) => {
        const formattedValue = encodeURIComponent(`${value}`);
        return `${key}=${formattedValue}`;
      })
      .join('&');

    if (!parameters) return url;

    return `${formattedUrl}${parameters}`;
  }
}
