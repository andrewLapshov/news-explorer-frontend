import '../index.css';

const headerMenu = document.querySelector('.header__menu');
const overlay = document.querySelector('.popup');
const headerList = document.querySelector('.header__list');
const header = document.querySelector('.header');

headerMenu.addEventListener('click', e => {
  if (
    window.matchMedia('(max-width: 650px)').matches &&
    e.target.classList.contains('header__menu')
  ) {
    headerMenu.classList.toggle('header__menu_is-active_black');
    headerList.classList.toggle('header__list_is-active');
    overlay.classList.toggle('popup_is-opened');
  }
});
