import errorHandler from './errorHandler';

const renderPage = (api, header, articleInfo) => {
  api
    .getUserData()
    .then(res => {
      header.render({ isLoggedIn: true, userName: res.data.name });
      if (articleInfo) {
        articleInfo.setUsername(res.data.name);
      }
    })
    .catch(err => {
      errorHandler(err);
    });
};

export default renderPage;
