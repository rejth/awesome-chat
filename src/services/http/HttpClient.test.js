import {
  describe,
  beforeAll,
  test,
  jest,
  expect,
} from '@jest/globals';

import HttpClient from './HttpClient';

const http = new HttpClient((optionsWithBody) => (
  Promise.resolve(optionsWithBody)
));

HttpClient.getAccessToken = jest.fn();

describe('Testing an instance of the HttpClient class', () => {
  let method = '';
  let url = '';
  let data = {};

  beforeAll(() => {
    method = 'post';
    url = 'https://some-url.com';
    data = { first: 1, second: 2 };
  });

  test('getRequestOptions with authorization token', () => {
    HttpClient.getAccessToken.mockReturnValue('token');
    const options = HttpClient.getRequestOptions(method, url);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(options?.method).toBe(method);
    expect(options?.url).toBe(url);
    expect(options).toEqual(expect.objectContaining({
      url: expect.any(String),
      method: expect.any(String),
      headers: expect.objectContaining({
        'Content-Type': expect.any(String),
        Authorization: 'Bearer token',
      }),
    }));
    expect(options).toMatchSnapshot();
  });

  test('getRequestOptions without authorization token', () => {
    HttpClient.getAccessToken.mockReturnValue(null);
    const options = HttpClient.getRequestOptions(method, url);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(options).toEqual(expect.objectContaining({
      headers: expect.not.objectContaining({
        Authorization: expect.any(String),
      }),
    }));
    expect(options).toMatchSnapshot();
  });

  test('getOptionsWithBody', () => {
    HttpClient.getAccessToken.mockReturnValue('token');
    const spy = jest.spyOn(HttpClient, 'getRequestOptions');

    const options = HttpClient.getRequestOptions(method, url);
    const optionsWithBody = HttpClient.getOptionsWithBody(options, data);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(optionsWithBody).toHaveProperty('data');
    expect(optionsWithBody?.data).toMatchObject(data);
    spy.mockRestore();
    expect(optionsWithBody).toMatchSnapshot();
  });

  test('getUrlWithData', () => {
    const result = HttpClient.getUrlWithData(url, data);
    expect(result).toBe(`${url}?first=1&second=2`);
    expect(result).toMatchSnapshot();
  });

  test('getDataLikeString', () => {
    expect(HttpClient.getDataLikeString(data)).toBe(JSON.stringify(data));
    expect(HttpClient.getDataLikeString(null)).toBeNull();
  });

  test('method GET', async () => {
    HttpClient.getAccessToken.mockReturnValue('some-token');
    const result = await http.get(url, data);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(result?.url).toBe(`${url}?first=1&second=2`);
    expect(result).not.toHaveProperty('data');
    expect(result).toMatchSnapshot();
  });

  test('method POST', async () => {
    HttpClient.getAccessToken.mockReturnValue('some-token');
    const result = await http.post(url, data);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(result?.url).toBe(url);
    expect(result).toHaveProperty('data');
    expect(result?.data).toMatchObject(data);
    expect(result).toMatchSnapshot();
  });

  test('method PUT', async () => {
    HttpClient.getAccessToken.mockReturnValue('some-token');
    const result = await http.put(url, data);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(result?.url).toBe(url);
    expect(result).toHaveProperty('data');
    expect(result?.data).toMatchObject(data);
    expect(result).toMatchSnapshot();
  });

  test('method DELETE', async () => {
    HttpClient.getAccessToken.mockReturnValue('some-token');
    const result = await http.delete(url, data);

    expect(HttpClient.getAccessToken).toHaveBeenCalledTimes(1);
    expect(result?.url).toBe(`${url}?first=1&second=2`);
    expect(result).not.toHaveProperty('data');
    expect(result).toMatchSnapshot();
  });
});
