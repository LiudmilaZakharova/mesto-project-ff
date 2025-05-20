const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, clickDelete, clickImg, clickLike, allowDelete, isLiked) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardLikeButton = placesItem.querySelector('.card__like-button');

  const cardName = placesItem.querySelector('.card__title');
  const cardImage = placesItem.querySelector('.card__image');
  const cardLikeCount = placesItem.querySelector('.card__like-counter');
  const cardId = cardData._id;

  if (isLiked) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;
  
  if (allowDelete) {
    deleteButton.classList.add('card__delete-button-active');
   }

  deleteButton.addEventListener('click', () => clickDelete(placesItem, cardId));
  cardImage.addEventListener('click', () => clickImg({ name: cardData.name, link: cardData.link }));
  cardLikeButton.addEventListener('click', () => clickLike(cardId, cardLikeButton, cardLikeCount));

  return placesItem;
};

function deleteCardFunc (cardElement) {
  cardElement.remove();
};

function downLike (cardLike) {
  const targetClass = "card__like-button_is-active";
  cardLike.classList.toggle(targetClass);
  // Возвращает true если кнопка активна, иначе false
  return cardLike.classList.contains("card__like-button_is-active");
};

export { createCard, deleteCardFunc, downLike };