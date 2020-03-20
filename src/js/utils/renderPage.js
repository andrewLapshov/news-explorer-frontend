const renderPage = (api, header, articleInfo) => {
  api
    .getUserData()
    .then(res => {
      header.render({ isLoggedIn: true, userName: res.data.name });
      if (articleInfo) {
        articleInfo.setUsername(res.data.name);
      }
    })
    .catch(err => console.log(err));
};

export default renderPage;
