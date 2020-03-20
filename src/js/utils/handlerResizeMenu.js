const handlerResizeMenu = (header, popup) => {
  if (
    !window.matchMedia('(max-width: 650px)').matches &&
    header.checkMenuState()
  ) {
    if (!popup.isOpened) {
      header.toggleMenu();
    }
    header.toggleMenuButton();
  } else if (
    window.matchMedia('(max-width: 650px)').matches &&
    !header.checkMenuState()
  ) {
    if (popup.isOpened) {
      header.toggleMenuButton();
    }
  }
};

const handlerResizeMenuLoggedIn = header => {
  if (
    !window.matchMedia('(max-width: 650px)').matches &&
    header.checkMenuState()
  ) {
    header.toggleMenu();
    header.toggleMenuButton();
  }
};

export { handlerResizeMenu, handlerResizeMenuLoggedIn };
