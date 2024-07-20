import queryString from 'query-string';

interface IRequest {
  url: string;
  method?: string;
  headers?: HeadersInit;
  params?: any;
  body?: any;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default class ApiClient {
  prefix: string;

  token: string;

  constructor({ prefix = 'v1/' } = {}) {
    this.prefix = prefix;

    this.token = '';
  }

  async get(url: string, params: HeadersInit) {
    return this.request({
      url,
      params,
      method: 'GET',
    });
  }

  async post(url: string, payload: unknown, params: HeadersInit) {
    return this.request({
      url,
      method: 'POST',
      params,
      body: payload,
    });
  }

  async put(url: string, payload = {}) {
    return this.request({
      url,
      method: 'PUT',
      body: payload,
    });
  }

  async patch(url: string, payload = {}) {
    return this.request({
      url,
      method: 'PATCH',
      body: payload,
    });
  }

  async delete(url: string, payload = {}) {
    return this.request({
      url,
      method: 'DELETE',
      body: payload,
    });
  }

  async request({ url, method, params = {}, body }: IRequest) {
    try {
      const requestHeaders: HeadersInit = {
        'Cache-Control': 'no-cache',
        pragma: 'no-cache',
        'Content-Type': 'application/json',
      };

      const query = Object.keys(params).length ? `?${queryString.stringify(params)}` : '';

      const response = await fetch(`${API_URL}${this.prefix}${url}${query}`, {
        method,
        headers: requestHeaders,
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();

        return data;
      }

      throw new Error(response.statusText);
    } catch (e) {
      console.log('[ERROR]: ', e.message);

      throw e;
    }
  }
}
