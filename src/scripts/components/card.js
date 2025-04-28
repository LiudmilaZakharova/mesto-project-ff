const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, clickDelete, clickImg, clickLike) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardLikeButton = placesItem.querySelector('.card__like-button');

  const cardName = placesItem.querySelector('.card__title');
  const cardImage = placesItem.querySelector('.card__image');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;

  deleteButton.addEventListener('click', () => clickDelete(placesItem));
  cardImage.addEventListener('click', clickImg);
  cardLikeButton.addEventListener('click', () => clickLike(cardLikeButton));

  return placesItem;
};

function deleteCardFunc (cardElement) {
  cardElement.remove();
};

function downLike (cardLike) {
  cardLike.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCardFunc, downLike };