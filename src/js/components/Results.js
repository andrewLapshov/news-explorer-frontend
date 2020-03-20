import BaseComponent from './BaseComponent';

export default class Results extends BaseComponent {
  constructor(element, isArticles) {
    super();
    this._element = element;
    this._isArticles = isArticles;
    this._message = this._element.querySelector('.results__message');
    this._cardlist = this._element.querySelector('.results__list');
    this._preloader = this._element.querySelector('.preloader');
    this.cardsData = null;
    this.keyWord = null;
    this.counter = null;
    // this._handleMoreCards = this._handleMoreCards.bind(this);
    // this._setListener();
    this._initializeSearchResultsElems();
  }

  _initializeSearchResultsElems() {
    if (!this._isArticles) {
      this._moreCards = this._element.querySelector('.results__button');
      this._noResults = this._element.querySelector('.results__no-results');
    }
  }

  show() {
    if (!this._isArticles) {
      this.toggleNoResults(false);
      this.toggleMoreCards(false);
    }
    this._cardlist.textContent = '';
    this._message.textContent = '';
    this.togglePreloader(true);
    this._element.classList.add('results_is-active');
  }

  insertElement(node) {
    this._cardlist.append(node);
  }

  togglePreloader(isShow) {
    if (isShow) {
      this._preloader.classList.add('preloader_is-active');
    } else {
      this._preloader.classList.remove('preloader_is-active');
    }
  }

  toggleMoreCards(isShow) {
    if (isShow) {
      this._moreCards.classList.add('results__button_active');
    } else {
      this._moreCards.classList.remove('results__button_active');
    }
  }

  toggleNoResults(isShow) {
    if (isShow) {
      this._noResults.classList.add('results__no-results_is-active');
    } else {
      this._noResults.classList.remove('results__no-results_is-active');
    }
  }

  setErrorMessage(message) {
    this._message.textContent = message;
    // переделать в сеттер, добавить текст в конфиг
  }

  // moreCardsCallback(fn) {
  //   this._moreCardsCallback = fn;
  // }

  // _handleMoreCards(e) {
  //   e.preventDefault();
  //   if (typeof this._moreCardsCallback === `function`) {
  //     return this._moreCardsCallback(this.cardsData);
  //   }
  // }

  // _setListener() {
  //   this._moreCards.addEventListener('click', this._handleMoreCards);
  // }
}
