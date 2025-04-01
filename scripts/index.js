// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTmp = document.querySelector('#card-template').content;

function createCard (name, link, clickEvent) {
  const placesItem = cardTmp.querySelector('.places__item').cloneNode(true);
  const deleteBtn = placesItem.querySelector('.card__delete-button');
  placesItem.querySelector('.card__title').textContent = name;
  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = name;
  deleteBtn.addEventListener('click', clickEvent);

  return placesItem;
}

function cardDeleteFunc(evt) {
  const cardDelete = evt.currentTarget.closest('.places__item');
  cardDelete.remove();
}

 initialCards.forEach(function (cardContent) {
  // const placesItem = cardTmp.querySelector('.places__item').cloneNode(true);
  // const deleteBtn = placesItem.querySelector('.card__delete-button');
  // placesItem.querySelector('.card__title').textContent = card.name;
  // placesItem.querySelector('.card__image').src = card.link;
  // placesItem.querySelector('.card__image').alt = card.name;

  // deleteBtn.addEventListener('click', function() {
  //   const cardDelete = deleteBtn.closest('.places__item');
  //   cardDelete.remove();
  // });

  // placesList.append(placesItem);
  // function cardDeleteFunc() {
  //   const cardDelete = deleteBtn.closest('.places__item');
  //   cardDelete.remove();
  // }
  placesList.append(createCard(cardContent.name, cardContent.link, cardDeleteFunc));
});




// @todo: Функция удаления карточки




// @todo: Вывести карточки на страницу
