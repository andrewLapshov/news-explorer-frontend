import config from '../constants/config';

const { ONE_DAY } = config;

export default class NewsApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._lastDay = options.lastDay;
  }

  static getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _getDates() {
    const today = new Date();
    const lastday = new Date(today.getTime() - this._lastDay * ONE_DAY);
    return `&from=${lastday
      .toISOString()
      .slice(0, 10)}&to=${today.toISOString().slice(0, 10)}`;
  }

  getNews(input) {
    return fetch(`${this._url}/?q=${input}${this._getDates()}&pageSize=100`, {
      headers: this._headers,
    }).then(res => NewsApi.getJSONResponse(res));
  }
}
