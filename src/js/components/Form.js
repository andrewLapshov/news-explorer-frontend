import BaseComponent from './BaseComponent';
import errors from '../constants/errors';

export default class Form extends BaseComponent {
  constructor(template) {
    super();
    this._element = document
      .querySelector(template)
      .content.cloneNode(true)
      .querySelector('.form');

    this._validateHandler = this._validateHandler.bind(this);
    this._setListener();
  }

  getInputValues() {
    const values = {};
    const res = Array.from(this._element.elements);
    for (let i = 0; i < res.length - 1; i++) {
      values[res[i].name] = res[i].value;
    }
    return values;
  }

  get element() {
    return this._element;
  }

  setSubmitError(err) {
    this._element.querySelector('.form__error_submit').textContent = `${err}`;
  }

  // eslint-disable-next-line class-methods-use-this
  _inputHandler(e) {
    const error = e.target.nextElementSibling;
    if (e.target.validity.valueMissing) {
      error.textContent = errors.MISSING_VALUE_ERROR;
    } else if (e.target.validity.tooShort && e.target.name === 'password') {
      error.textContent = errors.PASSWORD_LENGTH_ERROR;
    } else if (e.target.validity.tooShort || e.target.validity.tooShort) {
      error.textContent = errors.NAME_LENGTH_ERROR;
    } else if (e.target.validity.patternMismatch) {
      error.textContent = errors.WRONG_EMAIL_ERROR;
    } else {
      error.textContent = '';
    }
  }

  _checkFormValid() {
    if (this._element.checkValidity()) return true;
    return false;
  }

  _validateHandler(e) {
    this._inputHandler(e);

    if (this._checkFormValid()) {
      this._element.elements.submit.removeAttribute('disabled');
      this._element.elements.submit.classList.add('form__submit_active');
    } else {
      this._element.elements.submit.setAttribute('disabled', true);
      this._element.elements.submit.classList.remove('form__submit_active');
    }
  }

  _setListener() {
    this._element.addEventListener('input', this._validateHandler);
  }
}
