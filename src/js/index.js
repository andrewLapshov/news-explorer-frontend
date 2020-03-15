import '../pages/index.css';

const headerMenu = document.querySelector('.header__menu');
const headerList = document.querySelector('.header__list');
const overlay = document.querySelector('.popup');
const header = document.querySelector('.header');
const search = document.querySelector('.search');

headerMenu.addEventListener('click', e => {
  if (
    window.matchMedia('(max-width: 650px)').matches &&
    e.target.classList.contains('header__menu')
  ) {
    headerMenu.classList.toggle('header__menu_is-active_white');
    headerList.classList.toggle('header__list_is-active');
    overlay.classList.toggle('popup_is-opened');
    header.classList.toggle('header_state_dropdown');
  }
});

overlay.addEventListener('click', e => {
  if (
    !e.target.closest('.popup__content') ||
    e.target.classList.contains('popup__close')
  ) {
    overlay.innerHTML = '';
    overlay.classList.toggle('popup_is-opened');
  }
  document.body.style.overflow = '';
});

header.querySelector('.header__button').addEventListener('click', () => {
  header
    .querySelector('.header__button-icon')
    .classList.toggle('header__button-icon_is-active');

  const loginPopup = document
    .querySelector('.popup__template_type_login')
    .content.cloneNode(true)
    .querySelector('.popup__content');
  const signupPopup = document
    .querySelector('.popup__template_type_signup')
    .content.cloneNode(true)
    .querySelector('.popup__content');
  document.body.style.overflow = 'hidden';

  overlay.appendChild(loginPopup);
  loginPopup.addEventListener('input', e => {
    if (e.target.value) {
      loginPopup
        .querySelector('.popup__submit')
        .classList.add('popup__submit_active');
    }
  });

  if (window.matchMedia('(max-width: 650px)').matches) {
    headerList.classList.toggle('header__list_is-active');
    headerMenu.classList.toggle('header__menu_is-active_white');
    header.classList.toggle('header_state_dropdown');
  }

  if (!overlay.classList.contains('popup_is-opened')) {
    overlay.classList.toggle('popup_is-opened');
  }

  loginPopup
    .querySelector('.popup__switch-link')
    .addEventListener('click', () => {
      overlay.innerHTML = '';
      overlay.appendChild(signupPopup);
      signupPopup
        .querySelector('.popup__submit')
        .addEventListener('click', () => {
          signupPopup
            .querySelector('.popup__submit')
            .classList.toggle('popup__submit_active');
        });
      signupPopup
        .querySelector('.popup__switch-link')
        .addEventListener('click', () => {
          overlay.innerHTML = '';
          overlay.appendChild(loginPopup);
        });
    });

  loginPopup.querySelector('.popup__submit').addEventListener('click', () => {
    const successPopup = document
      .querySelector('.popup__template_type_success')
      .content.cloneNode(true)
      .querySelector('.popup__content');
    overlay.innerHTML = '';
    overlay.appendChild(successPopup);
    successPopup
      .querySelector('.popup__switch-link')
      .addEventListener('click', () => {
        overlay.innerHTML = '';
        overlay.appendChild(signupPopup);
      });
  });
});

search.addEventListener('submit', e => {
  e.preventDefault();

  document
    .querySelector('.results__button')
    .classList.remove('results__button_active');

  document.querySelector('.results__list').style.display = 'none';

  if (search.elements.search.value) {
    document
      .querySelector('.preloader')
      .classList.toggle('preloader_is-active');
  } else {
    document
      .querySelector('.results__no-results')
      .classList.toggle('results__no-results_is-active');
  }
});

search.addEventListener('input', () => {
  if (search.elements.search.value) {
    document
      .querySelector('.search__button')
      .classList.add('search__button_active');
  } else {
    document
      .querySelector('.search__button')
      .classList.remove('search__button_active');
  }
});
