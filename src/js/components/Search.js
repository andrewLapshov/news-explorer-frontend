import BaseComponent from './BaseComponent';
import errors from '../constants/errors';

const { MISSING_SEARCH_VALUE_ERROR, TYPE_SEARCH_VALUE } = errors;

export default class Search extends BaseComponent {
  constructor(element) {
    super();
    this._element = element;
    this._input = this._element.querySelector('.search__input');
    this._button = this._element.querySelector('.search__button');
    this.setListeners([
      {
        event: 'input',
        element: 'element',
        callback: this._validateHandler,
      },
    ]);
  }

  get input() {
    return this._input.value;
  }

  _validateHandler(e) {
    if (e.target.validity.valueMissing) {
      this._input.placeholder = MISSING_SEARCH_VALUE_ERROR;
    } else {
      this._input.placeholder = TYPE_SEARCH_VALUE;
    }

    if (this._element.checkValidity()) {
      this._button.removeAttribute('disabled');
      this._button.classList.add('search__button_active');
    } else {
      this._button.setAttribute('disabled', true);
      this._button.classList.remove('search__button_active');
    }
  }
}
