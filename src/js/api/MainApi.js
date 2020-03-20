export default class Api {
  constructor(options) {
    this.url = options.url;
  }

  getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signup(userData) {
    const { name, email, password } = userData;
    return fetch(`${this.url}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(res => this.getJSONResponse(res));
  }

  signin(userData) {
    const { email, password } = userData;
    return fetch(`${this.url}/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => this.getJSONResponse(res));
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => this.getJSONResponse(res));
  }

  addBookmark(cardData) {
    // const {
    //   title,
    //   description: text,
    //   urlToImage: image,
    //   publishedAt: date,
    //   url: link,
    //   keyword,
    // } = cardData;

    // const source = cardData.source.name;
    return fetch(`${this.url}/articles`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(cardData),
    }).then(res => this.getJSONResponse(res));
  }

  deleteBookmark(articleId) {
    return fetch(`${this.url}/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    }).then(res => this.getJSONResponse(res));
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => this.getJSONResponse(res));
  }
}
