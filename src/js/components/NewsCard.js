import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(data, template) {
    super();
    this._element = document
      .querySelector(template)
      .content.cloneNode(true)
      .querySelector('.card__wrapper');
    this.cornerButton = this._element.querySelector('.card__corner-button');

    this._data = data;
    this._id = null;
    this._cardEventCallback = null;
    // this._handlerCardEvent = this._handlerCardEvent.bind(this);

    // this._source = this._element.querySelector('.card__source');
    // this._title = this._element.querySelector('.card__title');
    // this._date = this._element.querySelector('.card__date');
    this._textWrapper = this._element.querySelector('.card__text-wrapper');
    // this._image = this._element.querySelector('.card__image');
    // this._keyword = this._element.querySelector('.card__corner-label');

    // this._initializeMarkup(['.card__source', '.card__title']);
    this._setData(this._data);
    this._handlerTruncateCardText = this._handlerTruncateCardText.bind(this);
    // setTimeout(this._handlerTruncateCardText, 10);
    // this._setListener();
  }

  // _initializeMarkup(domElements) {
  //   domElements.forEach(domElement => {
  //     this[`${domElement.replace('.card_', '')}`] = this._element.querySelector(
  //       `${domElement}`,
  //     );
  //   });
  // }

  _truncateCardText(num) {
    this._element.querySelector(
      '.card__text',
    ).textContent = `${this._data.text.substr(0, num)}...`;
  }

  _handlerTruncateCardText() {
    // console.log(this._textWrapper.clientHeight);
    switch (Math.round(this._textWrapper.clientHeight)) {
      case 120:
        this._truncateCardText(120);
        break;
      case 110:
        this._truncateCardText(110);
        break;
      case 90:
        this._truncateCardText(100);
        break;
      default:
        this._truncateCardText(50);
    }
  }

  _setListener() {
    window.addEventListener('resize', this._handlerTruncateCardText);
  }

  remove() {
    // this.cornerButton.removeEventListener('click', this._handlerCardEvent);
    this._removeListeners();
    this._element.remove();
  }

  // eslint-disable-next-line class-methods-use-this
  _setFormattedDate(dataDate) {
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

  _setData(data) {
    this._element.querySelector('.card__source').textContent = data.source;
    // this._element.querySelector('.card__title').textContent = data.title;
    this._element.querySelector('.card__title').textContent =
      data.title.length > 40 ? `${data.title.substr(0, 40)}...` : data.title;

    this._element.querySelector(
      '.card__date',
    ).textContent = this._setFormattedDate(data.date);

    this._element.querySelector('.card__text').textContent = data.text;
    // console.log(data.description.length);
    // this._element.querySelector('.card__text').textContent =
    //   data.description.length > 111
    //     ? `${data.description.substr(0, 111)}...`
    //     : data.description;

    // console.log(data.description.length);

    this._element.querySelector(
      '.card__image',
    ).style.backgroundImage = `url('${data.image}')`;
    if (this._element.querySelector('.card__keyword')) {
      this._element.querySelector('.card__keyword').textContent = data.keyword;
      // this._element.querySelector('.card__corner-label').style.display =
      //   'block';
    }
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

  // cardEventCallback(fn) {
  //   this._cardEventCallback = fn;
  // }

  // _handlerCardEvent(e) {
  //   e.preventDefault();

  //   if (typeof this._cardEventCallback === 'function') {
  //     return this._cardEventCallback(this);
  //   }
  // }

  // _setListener() {
  //   this.cornerButton.addEventListener('click', this._handlerCardEvent);
  // }
}
