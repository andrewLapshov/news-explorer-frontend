export default class MainApi {
  constructor(options) {
    this._url = options.url;
  }

  static getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  signup(userData) {
    const { name, email, password } = userData;
    return fetch(`${this._url}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(res => MainApi.getJSONResponse(res));
  }

  signin(userData) {
    const { email, password } = userData;
    return fetch(`${this._url}/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => MainApi.getJSONResponse(res));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => MainApi.getJSONResponse(res));
  }

  addBookmark(cardData) {
    return fetch(`${this._url}/articles`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(cardData),
    }).then(res => MainApi.getJSONResponse(res));
  }

  deleteBookmark(articleId) {
    return fetch(`${this._url}/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    }).then(res => MainApi.getJSONResponse(res));
  }

  getArticles() {
    return fetch(`${this._url}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => MainApi.getJSONResponse(res));
  }
}
