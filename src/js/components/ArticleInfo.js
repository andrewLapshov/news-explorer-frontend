import BaseComponent from './BaseComponent';
import errors from '../constants/errors';
import articleCases from '../constants/articleCases';

const { NOMINATIVE_CASE, GENITIVE_CASE, ACCUSATIVE_CASE } = articleCases;
const { NO_ARTICLES } = errors;

export default class ArticleInfo extends BaseComponent {
  constructor(element) {
    super();
    this._element = element;
    this._counterDOM = this._element.querySelector('.article-info__counter');
    this._username = this._element.querySelector('.article-info__name');
    this._text = this._element.querySelector('.article-info__text');
    this._keywords = this._text.querySelector('.article-info__keywords');
    this._saved = this._element.querySelector('.article-info__saved');

    this._summary = {};
    this.counter = 0;
  }

  setUsername(value) {
    this._username.textContent = value;
  }

  createSummary(keyWord) {
    if (this._summary[keyWord]) {
      this._summary[keyWord] += 1;
    } else {
      this._summary[keyWord] = 1;
    }
  }

  changeSummary(keyWord) {
    this.counter -= 1;
    this._summary[keyWord] -= 1;
    if (!this._summary[keyWord]) delete this._summary[keyWord];
    this.sortSummary();
  }

  sortSummary() {
    const result = {};
    Object.keys(this._summary)
      .sort((a, b) => {
        return this._summary[b] - this._summary[a];
      })
      .forEach(i => {
        result[i] = this._summary[i];
      });

    this._summary = result;
    this._render();
  }

  _setInfo() {
    let info;
    const objKeys = Object.keys(this._summary);

    if (objKeys.length > 0 && objKeys.length <= 3) info = objKeys.join(', ');
    if (objKeys.length > 3) {
      info = `${objKeys[0]}, ${objKeys[1]} и ${objKeys.length - 2} другим`;
    }
    return info;
  }

  static _setCases(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  _render() {
    if (this.counter === 0) {
      this._counterDOM.textContent = NO_ARTICLES;
      this._text.style.display = 'none';
    } else {
      this._counterDOM.textContent = this.counter;
      this._keywords.textContent = this._setInfo();
      this._text.style.display = 'block';
    }
    this._saved.textContent = ArticleInfo._setCases(this.counter, [
      NOMINATIVE_CASE,
      GENITIVE_CASE,
      ACCUSATIVE_CASE,
    ]);
  }
}
