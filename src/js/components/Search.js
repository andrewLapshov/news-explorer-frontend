import BaseComponent from './BaseComponent';

export default class Search extends BaseComponent {
  constructor(element) {
    super();
    this._element = element;
    this._input = this._element.querySelector('.search__input');
  }

  get input() {
    return this._input.value;
  }
}
