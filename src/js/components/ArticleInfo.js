import BaseComponent from './BaseComponent';

export default class ArticleInfo extends BaseComponent {
  constructor(element) {
    super();
    this._element = element;
    this._counterDOM = this._element.querySelector('.article-info__counter');
    this._username = this._element.querySelector('.article-info__name');
    this.counter = 0;
    this.summary = {};
  }

  setUsername(value) {
    this._username.textContent = value;
  }

  createSummary(keyWord) {
    if (this.summary[keyWord]) {
      this.summary[keyWord] += 1;
    } else {
      this.summary[keyWord] = 1;
    }
  }

  changeSummary(keyWord) {
    this.counter -= 1;
    this.summary[keyWord] -= 1;
    if (!this.summary[keyWord]) delete this.summary[keyWord];
    this.sortSummary();
  }

  sortSummary() {
    const result = {};
    Object.keys(this.summary)
      .sort((a, b) => {
        return this.summary[b] - this.summary[a];
      })
      .forEach(i => {
        result[i] = this.summary[i];
      });

    this.summary = result;
    this._render();
  }

  _setInfo() {
    let info = 'Нет закладок';
    const objKeys = Object.keys(this.summary);

    if (objKeys.length > 0 && objKeys.length <= 3) info = objKeys.join(', ');
    if (objKeys.length > 3) {
      info = `${objKeys[0]}, ${objKeys[1]} и ${objKeys.length - 2} другим`;
    }
    return info;
  }

  _render() {
    this._element.querySelector(
      '.article-info__counter',
    ).textContent = this.counter;
    this._element.querySelector(
      '.article-info__keywords',
    ).textContent = this._setInfo();
  }
}
