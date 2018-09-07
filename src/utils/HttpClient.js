const axios = require('axios');
const qs = require('qs');

class HttpClient {
  constructor() {
    this.cookies = {};
    this.axios = axios.create({
      baseURL: 'https://kyfw.12306.cn/',
      withCredentials: true,
      headers: {
        Host: 'kyfw.12306.cn',
        Referer: 'https://kyfw.12306.cn/otn/login/init',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  _saveCookies(setCookies) {
    if (!Array.isArray(setCookies)) {
      return;
    }
    setCookies.forEach((cookie) => {
      const [key, rest] = cookie.split('=');
      const [value] = rest.split(';');
      this.cookies[key] = value;
    });
  }

  _getCookies() {
    const cookieString = Object.keys(this.cookies)
      .map(key => `${key}=${this.cookies[key]}`)
      .join(';');
    return cookieString;
  }

  get(url, config) {
    return this.axios.get(url, {
      headers: {
        Cookie: this._getCookies(),
      },
      ...config,
    }).then((response) => {
      this._saveCookies(response.headers['set-cookie'] || []);
      return response.data;
    });
  }

  post(url, data, config) {
    return this.axios.post(url, qs.stringify(data), {
      headers: {
        Cookie: this._getCookies(),
      },
      ...config,
    }).then((response) => {
      this._saveCookies(response.headers['set-cookie'] || []);
      return response.data;
    });
  }
}


module.exports = HttpClient;
