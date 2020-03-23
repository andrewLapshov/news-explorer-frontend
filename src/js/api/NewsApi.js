export default class NewsApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  static getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  static _getDates() {
    const today = new Date();
    const lastday = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return `&from=${lastday
      .toISOString()
      .slice(0, 10)}&to=${today.toISOString().slice(0, 10)}`;
  }

  getNews(input) {
    return fetch(
      `${this._url}/?q=${input}${NewsApi._getDates()}&pageSize=100`,
      {
        headers: this._headers,
      },
    ).then(res => NewsApi.getJSONResponse(res));
  }
}
