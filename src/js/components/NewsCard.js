import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(data, template) {
    super();
    this._element = document
      .querySelector(template)
      .content.cloneNode(true)
      .querySelector('.card__wrapper');
    this._data = data;
    this._id = null;
    this._cardEventCallback = null;
    this._textWrapper = this._element.querySelector('.card__text-wrapper');
    this._setData(this._data);
    this.truncateCardText = this.truncateCardText.bind(this);
    setTimeout(this.truncateCardText, 10);
  }

  truncateCardText() {
    const number =
      (this._textWrapper.clientWidth * this._textWrapper.clientHeight) / 245;

    this._element.querySelector(
      '.card__text',
    ).textContent = `${this._data.text.substr(0, number)}...`;
  }

  remove() {
    this._removeListeners();
    this._element.remove();
  }

  _setData(data) {
    this._element.querySelector('.card__source').textContent = data.source;
    this._element.querySelector('.card__title').textContent = data.title;
    this._element.querySelector(
      '.card__date',
    ).textContent = NewsCard._setFormattedDate(data.date);
    this._element.querySelector('.card__text').textContent = data.text;
    this._element.querySelector(
      '.card__image',
    ).style.backgroundImage = `url('${data.image}')`;
    if (this._element.querySelector('.card__keyword')) {
      this._element.querySelector('.card__keyword').textContent = data.keyword;
    }
  }

  static _setFormattedDate(dataDate) {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const [
      { value: day },
      ,
      { value: month },
      ,
      { value: year },
    ] = formatter.formatToParts(new Date(dataDate));

    return `${day} ${month}, ${year}`;
  }

  set id(cardId) {
    this._id = cardId;
  }

  get id() {
    return this._id;
  }

  get node() {
    return this._element;
  }
}
