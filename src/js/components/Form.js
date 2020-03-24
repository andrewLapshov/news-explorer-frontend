import BaseComponent from './BaseComponent';
import errors from '../constants/errors';

const {
  MISSING_VALUE_ERROR,
  PASSWORD_LENGTH_ERROR,
  NAME_LENGTH_ERROR,
  WRONG_EMAIL_ERROR,
} = errors;

export default class Form extends BaseComponent {
  constructor(template) {
    super();
    this._element = document
      .querySelector(template)
      .content.cloneNode(true)
      .querySelector('.form');
    this.setSubmitError = this.setSubmitError.bind(this);
    this.clear = this.clear.bind(this);
    this.setListeners([
      {
        event: 'input',
        element: 'element',
        callback: this._validateHandler,
      },
    ]);
  }

  static _inputHandler(e) {
    const error = e.target.nextElementSibling;
    if (e.target.validity.valueMissing) {
      error.textContent = MISSING_VALUE_ERROR;
    } else if (e.target.validity.tooShort && e.target.name === 'password') {
      error.textContent = PASSWORD_LENGTH_ERROR;
    } else if (e.target.validity.tooShort || e.target.validity.tooShort) {
      error.textContent = NAME_LENGTH_ERROR;
    } else if (e.target.validity.patternMismatch) {
      error.textContent = WRONG_EMAIL_ERROR;
    } else {
      error.textContent = '';
    }
  }

  get element() {
    return this._element;
  }

  toggleLockForm(isLock) {
    const elements = Array.from(this._element.elements);

    if (isLock) {
      this._clearErrors();
      elements.forEach(elem => {
        elem.setAttribute('disabled', true);
        if (elem.name === 'submit') {
          this._element.elements.submit.classList.remove('form__submit_active');
        }
      });
    } else {
      elements.forEach(elem => {
        elem.removeAttribute('disabled');
        if (elem.name === 'submit') {
          this._element.elements.submit.classList.add('form__submit_active');
        }
      });
    }
  }

  getInputValues() {
    const values = {};
    Array.from(this._element.elements).forEach(elem => {
      if (elem.name !== 'submit') values[elem.name] = elem.value;
    });
    return values;
  }

  setSubmitError(err) {
    this._element.querySelector('.form__error_submit').textContent = err;
  }

  clear() {
    this._element.reset();
    this._clearErrors();
  }

  _clearErrors() {
    this._element.querySelectorAll('.form__error').forEach(errorField => {
      errorField.textContent = '';
    });
  }

  _checkFormValid() {
    if (this._element.checkValidity()) return true;
    return false;
  }

  _validateHandler(e) {
    Form._inputHandler(e);

    if (this._checkFormValid()) {
      this._element.elements.submit.removeAttribute('disabled');
      this._element.elements.submit.classList.add('form__submit_active');
    } else {
      this._element.elements.submit.setAttribute('disabled', true);
      this._element.elements.submit.classList.remove('form__submit_active');
    }
  }
}
