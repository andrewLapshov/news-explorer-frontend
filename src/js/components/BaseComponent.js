export default class BaseComponent {
  constructor() {
    this._handlers = [];
    this.setListeners = this.setListeners.bind(this);
  }

  setListeners(listeners) {
    this._saveListeners(listeners);
    this._addEventListeners();
  }

  _saveListeners(listeners) {
    listeners.forEach(({ event, element, callback }) => {
      const bindedCallback = callback.bind(this);
      this._handlers.push({ event, element, bindedCallback });
    });
  }

  _addEventListeners() {
    this._handlers.forEach(({ event, element, bindedCallback }) => {
      if (typeof bindedCallback === 'function') {
        if (element === 'window') {
          window.addEventListener(event, bindedCallback);
        } else if (element === 'element') {
          this._element.addEventListener(event, bindedCallback);
        } else {
          this._element
            .querySelector(element)
            .addEventListener(event, bindedCallback);
        }
      }
    });
  }

  _removeListeners() {
    this._handlers.forEach(({ event, element, bindedCallback }) => {
      if (element === 'window') {
        window.removeEventListener(event, bindedCallback);
      } else if (element === 'element') {
        this._element.removeEventListener(event, bindedCallback);
      } else {
        this._element
          .querySelector(element)
          .removeEventListener(event, bindedCallback);
      }
    });
  }
}
