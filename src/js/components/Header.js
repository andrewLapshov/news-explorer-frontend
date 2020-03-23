import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(element, isArticlesUrl) {
    super();
    this._element = element;
    this._isArticlesUrl = isArticlesUrl;
    this._articlesLink = this._element.querySelector(
      '.header__list-item_articles',
    );
    this._buttonIcon = this._element.querySelector('.header__button-icon');
    this._buttonText = this._element.querySelector('.header__button-text');
    this._menu = this._element.querySelector('.header__menu');
    this._list = this._element.querySelector('.header__list');
    this._overlay = this._menu.querySelector('.header__menu-overlay');
  }

  render(props) {
    if (props.isLoggedIn) {
      this._articlesLink.style.display = 'inline-block';
      this._buttonIcon.style.display = 'block';
      this._buttonText.textContent = props.userName;
    } else {
      this._articlesLink.style.display = 'none';
      this._buttonIcon.style.display = 'none';
      this._buttonText.textContent = 'Авторизоваться';
    }
  }

  checkMenuState() {
    if (
      this._menu.classList.contains('header__menu_is-active_white') ||
      this._menu.classList.contains('header__menu_is-active_black')
    ) {
      return true;
    }
    return false;
  }

  toggleMenuButton() {
    if (this._isArticlesUrl) {
      this._menu.classList.toggle('header__menu_is-active_black');
    } else {
      this._menu.classList.toggle('header__menu_is-active_white');
    }
  }

  toggleMenu() {
    if (!this._isArticlesUrl) {
      this._element.classList.toggle('header_state_dropdown');
    }
    this._list.classList.toggle('header__list_is-active');
    this._overlay.classList.toggle('header__menu-overlay_is-active');
    document.body.classList.toggle('body_is-hidden');
  }
}
