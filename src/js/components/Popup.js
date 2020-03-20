import BaseComponent from './BaseComponent';
import config from '../constants/config';

export default class Popup extends BaseComponent {
  constructor(element) {
    super();
    this._element = element;
    this._content = this._element.querySelector('.popup__content');
    this.isOpened = false;
    this._closeHandler = this._closeHandler.bind(this);
  }

  setContent(content) {
    this._content.appendChild(content);
  }

  open(content) {
    document.body.style.overflow = 'hidden';
    this._element.classList.add('popup_is-opened');
    this.setContent(content);
    this._setListeners();
    this.isOpened = true;
  }

  clearContent() {
    document.body.style.overflow = '';
    this._content.lastChild.remove();
  }

  close() {
    this.clearContent();
    this._element.classList.remove('popup_is-opened');
    document.body.style.overflow = '';
    this._removeListeners();
    this.isOpened = false;
  }

  _closeHandler(e) {
    if (
      e.keyCode === config.ESCAPE_CODE ||
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close')
    ) {
      this.close();
    }
  }

  _setListeners() {
    document.addEventListener('keyup', this._closeHandler);
    this._element.addEventListener('mousedown', this._closeHandler);
  }

  _removeListeners() {
    document.removeEventListener('keyup', this._closeHandler);
    this._element.removeEventListener('mousedown', this._closeHandler);
  }
}
