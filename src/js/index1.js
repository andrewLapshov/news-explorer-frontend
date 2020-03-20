import '../pages/index.css';

const headerMenu = document.querySelector('.header__menu');
const headerList = document.querySelector('.header__list');
const overlay = document.querySelector('.popup');
const popup = document.querySelector('.popup__content');
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
  console.log(e.target.closest('.popup__content'));
  if (
    !e.target.closest('.popup__content') ||
    e.target.classList.contains('popup__close')
  ) {
    popup.lastChild.remove();
    overlay.classList.toggle('popup_is-opened');
  }
  document.body.style.overflow = '';
});

header.querySelector('.header__button').addEventListener('click', () => {
  header
    .querySelector('.header__button-icon')
    .classList.toggle('header__button-icon_is-active');

  const loginPopup = document
    .querySelector('.form_template-login')
    .content.cloneNode(true)
    .querySelector('.form');
  const signupPopup = document
    .querySelector('.form_template-signup')
    .content.cloneNode(true)
    .querySelector('.form');
  document.body.style.overflow = 'hidden';

  popup.appendChild(loginPopup);
  loginPopup.addEventListener('input', e => {
    if (e.target.value) {
      loginPopup
        .querySelector('.form__submit')
        .classList.add('form__submit_active');
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
    .querySelector('.form__switch-link')
    .addEventListener('click', e => {
      e.stopPropagation();
      popup.lastChild.remove();
      popup.appendChild(signupPopup);
      signupPopup
        .querySelector('.form__submit')
        .addEventListener('click', () => {
          signupPopup
            .querySelector('.form__submit')
            .classList.toggle('form__submit_active');
        });
      signupPopup
        .querySelector('.form__switch-link')
        .addEventListener('click', () => {
          popup.lastChild.remove();
          popup.appendChild(loginPopup);
        });
    });

  loginPopup.querySelector('.form__submit').addEventListener('click', e => {
    e.stopPropagation();

    const successPopup = document
      .querySelector('.form_template-success')
      .content.cloneNode(true)
      .querySelector('.form');
    popup.lastChild.remove();
    popup.appendChild(successPopup);
    successPopup
      .querySelector('.form__switch-link')
      .addEventListener('click', evt => {
        evt.stopPropagation();

        popup.lastChild.remove();
        popup.appendChild(signupPopup);
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
