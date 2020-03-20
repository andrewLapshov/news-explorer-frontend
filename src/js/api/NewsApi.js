export default class NewsApi {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getNews(input) {
    return fetch(`${this.url}/?q=${input}&pageSize=100&language=ru`, {
      headers: this.headers,
    }).then(res => this.getJSONResponse(res));
  }

  addBookmark({ cardData }) {
    return fetch('url/articles', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        cardData,
      }),
    }).then(res => this.getJSONResponse(res));
  }

  deleteBookmark(articleID) {
    return fetch(`url/articles/${articleID}`, {
      headers: {
        // добавить токен
      },
      method: 'DELETE',
    }).then(res => this.getJSONResponse(res));
  }

  getArticles() {
    return fetch(`url/articles`, {
      headers: {
        // добавить токен
      },
    }).then(res => this.getJSONResponse(res));
  }
}
