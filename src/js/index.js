import '../pages/index.css';
import config from './constants/config';
import errors from './constants/errors';

import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import Search from './components/Search';
import Results from './components/Results';
import NewsCard from './components/NewsCard';

import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';

import switchPopup from './utils/switchPopup';
import renderPage from './utils/renderPage';
import convertCardData from './utils/convertCardData';
import toggleSaveButton from './utils/toggleSaveButton';
import errorHandler from './utils/errorHandler';
import { handlerResizeMenu } from './utils/handlerResizeMenu';

const {
  SERVER_URL,
  NEWSAPI_URL,
  NEWSAPI_TOKEN,
  LAST_DAY,
  CARD_AMOUNT,
} = config;
const { GET_RESULT_ERROR, NO_INTERNET } = errors;

const mainApi = new MainApi({
  url: SERVER_URL,
});

const newsApi = new NewsApi({
  url: NEWSAPI_URL,
  headers: {
    authorization: NEWSAPI_TOKEN,
  },
  lastDay: LAST_DAY,
});

const loginForm = new Form('.form_template-login');
const signupForm = new Form('.form_template-signup');
const successForm = new Form('.form_template-success');
const header = new Header(document.querySelector('.header'), false);
const popup = new Popup(document.querySelector('.popup'));
const search = new Search(document.querySelector('.search'));
const results = new Results(document.querySelector('.results'), false);

switchPopup(loginForm, signupForm, popup);
switchPopup(signupForm, loginForm, popup);
switchPopup(successForm, loginForm, popup);

if (localStorage.getItem('token')) {
  renderPage(mainApi, header);
}

window.addEventListener('resize', () => handlerResizeMenu(header, popup));

// Header callback setting

const headerButtonHandler = e => {
  e.preventDefault();

  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    header.render({ isLoggedIn: false });
  } else {
    popup.open(loginForm.element, loginForm.clear);
    if (window.matchMedia('(max-width: 650px)').matches) {
      header.toggleMenu();
    }
  }
};

const headerMenuHandler = e => {
  if (
    window.matchMedia('(max-width: 650px)').matches &&
    e.target.classList.contains('header__menu')
  ) {
    header.toggleMenuButton();
    if (!document.querySelector('.popup_is-opened')) {
      header.toggleMenu();
    } else {
      popup.close();
    }
  }
};

header.setListeners([
  {
    event: 'click',
    element: '.header__button',
    callback: e => headerButtonHandler(e),
  },
  {
    event: 'click',
    element: '.header__menu',
    callback: e => headerMenuHandler(e),
  },
]);

// Forms callback setting

const loginFormHandler = e => {
  e.preventDefault();
  loginForm.toggleLockForm(true);

  mainApi
    .signin(loginForm.getInputValues())
    .then(data => {
      loginForm.toggleLockForm(false);
      localStorage.setItem('token', data.token);
      renderPage(mainApi, header);
      popup.close();
      if (window.matchMedia('(max-width: 650px)').matches) {
        header.toggleMenuButton();
      }
    })
    .catch(err => {
      loginForm.toggleLockForm(false);
      errorHandler(err, loginForm.setSubmitError, NO_INTERNET);
    });
};

const signupFormHandler = e => {
  e.preventDefault();
  signupForm.toggleLockForm(true);

  mainApi
    .signup(signupForm.getInputValues())
    .then(() => {
      signupForm.toggleLockForm(false);
      popup.clearContent();
      popup.setContent(successForm.element);
    })
    .catch(err => {
      signupForm.toggleLockForm(false);
      errorHandler(err, signupForm.setSubmitError, NO_INTERNET);
    });
};

loginForm.setListeners([
  {
    event: 'click',
    element: '.form__submit',
    callback: e => loginFormHandler(e),
  },
]);

signupForm.setListeners([
  {
    event: 'click',
    element: '.form__submit',
    callback: e => signupFormHandler(e),
  },
]);

// Search and Results callback setting

const cornerButtonHandler = (e, card, data) => {
  e.preventDefault();
  e.stopPropagation();

  if (localStorage.getItem('token')) {
    if (e.target.classList.contains('card__corner-button_saved')) {
      mainApi
        .deleteBookmark(card.id)
        .then(() => {
          e.target.classList.toggle('card__corner-button_saved');
        })
        .catch(err => {
          errorHandler(err);
        });
    } else {
      mainApi
        .addBookmark(data)
        .then(res => {
          e.target.classList.toggle('card__corner-button_saved');
          card.id = res.data._id;
        })
        .catch(err => {
          errorHandler(err);
        });
    }
  }
};

const addNewCard = data => {
  const newsCardData = convertCardData(data, search);

  const newsCardElement = new NewsCard(newsCardData, '.card-template');
  newsCardElement.setListeners([
    {
      event: 'click',
      element: '.card__corner-button',
      callback: e => cornerButtonHandler(e, newsCardElement, newsCardData),
    },
    {
      event: 'click',
      element: '.card',
      callback: () => {
        window.open(newsCardData.link, '_blank');
      },
    },
    {
      event: 'resize',
      element: 'window',
      callback: newsCardElement.truncateCardText,
    },
  ]);

  results.renderedCards.push(newsCardElement);
  results.insertElement(newsCardElement.node);
};

const searchHandler = e => {
  e.preventDefault();
  search.toggleLockForm();

  results.show();
  if (results.renderedCards.length > 0) {
    results.renderedCards.forEach(card => {
      card.remove();
    });
    results.renderedCards = [];
  }

  newsApi
    .getNews(search.input)
    .then(res => {
      search.toggleLockForm();
      results.togglePreloader(false);
      results.cardsData = res.articles;
      if (res.articles.length > 0) {
        for (let i = 0; i < CARD_AMOUNT; i++) {
          if (res.articles[i]) {
            addNewCard(res.articles[i]);
          } else {
            break;
          }
        }
        if (res.articles.length > CARD_AMOUNT) {
          results.toggleMoreCards(true);
          results.counter = 3;
        }
      } else if (res.articles.length === 0) {
        results.toggleNoResults(true);
      }
    })
    .catch(err => {
      search.toggleLockForm();
      results.togglePreloader(false);
      errorHandler(err, results.setMessageError, GET_RESULT_ERROR);
    });
};

const moreCardsHandler = () => {
  for (let i = results.counter; i < results.counter + CARD_AMOUNT; i++) {
    if (results.cardsData[i]) {
      addNewCard(results.cardsData[i]);
    } else {
      results.toggleMoreCards(false);
      break;
    }
  }
  results.counter += CARD_AMOUNT;
};

search.setListeners([
  {
    event: 'click',
    element: '.search__button',
    callback: e => searchHandler(e),
  },
]);

results.setListeners([
  {
    event: 'click',
    element: '.results__button',
    callback: moreCardsHandler,
  },
  {
    event: 'mouseover',
    element: '.results__list',
    callback: toggleSaveButton,
  },
  {
    event: 'mouseout',
    element: '.results__list',
    callback: toggleSaveButton,
  },
]);
