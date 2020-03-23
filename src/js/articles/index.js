import '../../pages/articles/index.css';
import config from '../constants/config';
import errors from '../constants/errors';

import Header from '../components/Header';
import Results from '../components/Results';
import NewsCard from '../components/NewsCard';
import ArticleInfo from '../components/ArticleInfo';

import MainApi from '../api/MainApi';

import renderPage from '../utils/renderPage';
import { handlerResizeMenuLoggedIn } from '../utils/handlerResizeMenu';

const { GET_RESULT_ERROR } = errors;

const mainApi = new MainApi({
  url: config.SERVER_URL,
});

const header = new Header(document.querySelector('.header'), true);
const results = new Results(document.querySelector('.results'), true);
const articleInfo = new ArticleInfo(document.querySelector('.article-info'));

window.addEventListener('resize', () => handlerResizeMenuLoggedIn(header));

if (localStorage.getItem('token')) {
  renderPage(mainApi, header, articleInfo);
} else {
  window.location.href = '../';
}

header.setListeners([
  {
    event: 'click',
    element: '.header__button',
    callback: e => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = '../';
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
        header.toggleMenu();
      }
    },
  },
]);

results.show();
mainApi
  .getArticles()
  .then(res => {
    results.togglePreloader(false);
    res.data.forEach(cardData => {
      articleInfo.createSummary(cardData.keyword);

      const newsCardElement = new NewsCard(cardData, '.card-bookmark-template');
      newsCardElement.setListeners([
        {
          event: 'click',
          element: '.card__corner-button',
          callback: e => {
            e.preventDefault();
            e.stopPropagation();
            if (
              window.confirm('Вы действительно хотите удалить эту новость?')
            ) {
              mainApi
                .deleteBookmark(cardData._id)
                .then(() => {
                  articleInfo.changeSummary(cardData.keyword);
                  newsCardElement.remove();
                  results.renderedCards.pop();
                  if (results.renderedCards.length === 0) {
                    results.hide();
                  }
                })
                .catch(err => alert(err));
            }
          },
        },
        {
          event: 'click',
          element: '.card',
          callback: () => {
            window.open(cardData.link, '_blank');
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
      articleInfo.counter += 1;
    });

    articleInfo.sortSummary();
  })
  .catch(err => {
    results.togglePreloader(false);
    if (typeof err.text === 'function') {
      err.text().then(error => {
        results.errorMessage = JSON.parse(error).message;
      });
    } else {
      results.errorMessage = GET_RESULT_ERROR;
    }
  });
