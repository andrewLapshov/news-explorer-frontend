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
import { handlerResizeMenu } from './utils/handlerResizeMenu';

const mainApi = new MainApi({
  url: config.SERVER_URL,
});

const newsApi = new NewsApi({
  url: config.NEWSAPI_URL,
  headers: {
    authorization: config.NEWSAPI_TOKEN,
  },
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

header.setListeners([
  {
    event: 'click',
    element: '.header__button',
    callback: e => {
      e.preventDefault();

      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        header.render({ isLoggedIn: false });
      } else {
        popup.open(loginForm.element);
        if (window.matchMedia('(max-width: 650px)').matches) {
          header.toggleMenu();
        }
      }
    },
  },
  {
    event: 'click',
    element: '.header__menu',
    callback: e => {
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
    },
  },
]);

loginForm.setListeners([
  {
    event: 'click',
    element: '.form__submit',
    callback: e => {
      e.preventDefault();
      mainApi
        .signin(loginForm.getInputValues())
        .then(data => {
          localStorage.setItem('token', data.token);
          renderPage(mainApi, header);
          popup.close();
          if (window.matchMedia('(max-width: 650px)').matches) {
            header.toggleMenuButton();
          }
        })
        .catch(err => loginForm.setSubmitError(err));
    },
  },
]);

signupForm.setListeners([
  {
    event: 'click',
    element: '.form__submit',
    callback: e => {
      e.preventDefault();
      mainApi
        .signup(signupForm.getInputValues())
        .then(() => {
          popup.clearContent();
          popup.setContent(successForm.element);
        })
        .catch(err => signupForm.setSubmitError(err));
    },
  },
]);

const addNewCard = data => {
  // const newsCardData = (({
  //   title,
  //   description: text,
  //   urlToImage: image,
  //   publishedAt: date,
  //   url: link,
  // }) => ({
  //   title,
  //   text,
  //   image,
  //   date,
  //   link,
  //   keyword: `${search.input[0].toUpperCase()}${search.input.substr(1)}`,
  //   source: data.source.name,
  // }))(data);

  const newsCardData = convertCardData(data, search);

  const newsCardElement = new NewsCard(newsCardData, '.card-template');
  newsCardElement.setListeners([
    {
      event: 'click',
      element: '.card__corner-button',
      callback: e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.classList.contains('card__corner-button_saved')) {
          mainApi
            .deleteBookmark(newsCardElement.id)
            .then(() => {
              e.target.classList.toggle('card__corner-button_saved');
            })
            .catch(() => alert('error'));
        } else {
          mainApi
            .addBookmark(newsCardData)
            .then(res => {
              e.target.classList.toggle('card__corner-button_saved');
              newsCardElement.id = res.data._id;
            })
            .catch(err => console.log(err));
        }
      },
    },
    {
      event: 'click',
      element: '.card',
      callback: () => {
        window.open(newsCardData.link, '_blank');
      },
    },
  ]);
  results.insertElement(newsCardElement.node);
};

search.setListeners([
  {
    event: 'click',
    element: '.search__button',
    callback: e => {
      e.preventDefault();
      results.show();

      newsApi
        .getNews(search.input)
        .then(res => {
          results.togglePreloader(false);
          results.cardsData = res.articles;
          results.keyWord = search.input;
          if (res.articles.length > 0) {
            for (let i = 0; i < 3; i++) {
              if (res.articles[i]) {
                addNewCard(res.articles[i]);

                // const newsCardElement = new NewsCard(res.articles[i]);
                // results.insertElement(newsCardElement.node);

                // window.addEventListener('resize', () => {
                //   // console.log(
                //   //   // document.querySelector('.card__text').clientHeight,
                //   //   document.querySelector('.card__text-wrapper').clientHeight,
                //   // );
                //   const p = document.querySelector('.card__text');
                //   console.log(p.textContent.length);
                //   console.log(p.textContent.length);

                //   const div = document.querySelector('.card__text-wrapper');
                //   while (p.clientHeight > div.clientHeight) {
                //     p.textContent = p.textContent.replace(/\W*\s(\S)*$/, '...');
                //   }
                // });
              } else {
                break;
              }
            }
            if (res.articles.length > 3) {
              results.toggleMoreCards(true);
              results.counter = 3;
            }
          } else if (res.articles.length === 0) {
            results.toggleNoResults(true);
          }
        })
        .catch(err => {
          console.log(err);
          results.togglePreloader(false);
          results.setErrorMessage(errors.GET_RESULT_ERROR);
        });
    },
  },
]);

results.setListeners([
  {
    event: 'click',
    element: '.results__button',
    callback: () => {
      for (let i = results.counter; i < results.counter + 3; i++) {
        if (results.cardsData[i]) {
          addNewCard(results.cardsData[i]);
          // const newsCardElement = new NewsCard(
          //   results.cardsData[i],
          //   '.card-template',
          // );
          // results.insertElement(newsCardElement.node);
        } else {
          results.toggleMoreCards(false);
          break;
        }
      }
      results.counter += 3;
    },
  },
]);
