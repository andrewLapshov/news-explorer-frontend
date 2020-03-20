export default class BaseComponent {
  constructor() {
    this._handlers = [];
    this.setListeners = this.setListeners.bind(this);
  }

  setListeners(listeners) {
    listeners.forEach(listener => {
      this._addEventListeners(listener);
      this._handlers.push(listener);
    });
  }

  _addEventListeners({ event, element, callback }) {
    if (typeof callback === 'function') {
      // this[callback] = null;
      // this[callback] = callback.bind(this);
      this._element.querySelector(element).addEventListener(event, callback);
    }
  }

  _removeListeners() {
    this._handlers.forEach(({ event, element, callback }) => {
      this._element.querySelector(element).removeEventListener(event, callback);
    });
  }
}
