const toggleSaveButton = e => {
  if (
    e.target.classList.contains('card__corner-button_unsaved') &&
    !localStorage.getItem('token')
  ) {
    e.target.nextElementSibling.classList.toggle('card__corner-label_active');
  }
};

export default toggleSaveButton;
