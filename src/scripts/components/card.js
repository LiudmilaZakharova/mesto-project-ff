import { likeCardApi, dislikeCardApi } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, clickDelete, clickImg, clickLike, userId) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardLikeButton = placesItem.querySelector('.card__like-button');

  const cardName = placesItem.querySelector('.card__title');
  const cardImage = placesItem.querySelector('.card__image');
  const cardLikeCount = placesItem.querySelector('.card__like-counter');
  const cardId = cardData._id;

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;
  
  const isLikeActivated = cardData.likes.map(
    function (likeObj) {return likeObj._id;}).includes(userId);
  if (isLikeActivated) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  const allowDelete = (userId == cardData.owner._id);
  if (allowDelete) {
    deleteButton.classList.add('card__delete-button-active');
  }

  deleteButton.addEventListener('click', () => clickDelete(placesItem, cardId));
  cardImage.addEventListener('click', () => clickImg({ name: cardData.name, link: cardData.link }));
  cardLikeButton.addEventListener('click', () => clickLike(cardId, cardLikeButton, cardLikeCount));

  return placesItem;
};

// меняем состояние кнопки лайка
function downLike (cardLike) {
  const targetClass = "card__like-button_is-active";
  cardLike.classList.toggle(targetClass);
  // Возвращает true если кнопка активна, иначе false
  return cardLike.classList.contains("card__like-button_is-active");
};

// меняем счетчик лайков
function setLikeCounter (cardLikeCount, likesNum) { 
  cardLikeCount.textContent = likesNum;
};

// Функция удаления карточки с формы
function deleteCardFunc (cardElement) {
  cardElement.remove();
};

// export { createCard, deleteCardFunc, downLike };
export { createCard, deleteCardFunc, downLike, setLikeCounter };