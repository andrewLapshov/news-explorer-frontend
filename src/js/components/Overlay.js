export default class Overlay {
  constructor(element) {
    this._element = element;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this._element.classList.add('popup_is-opened');
  }

  hide() {
    this._element.classList.remove('popup_is-opened');
  }
}
