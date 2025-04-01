const placesList = document.querySelector('.places__list');
const cardTmp = document.querySelector('#card-template').content;

function createCard (name, link, clickDelete) {
  const placesItem = cardTmp.querySelector('.places__item').cloneNode(true);
  const deleteBtn = placesItem.querySelector('.card__delete-button');
  placesItem.querySelector('.card__title').textContent = name;
  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = name;
  deleteBtn.addEventListener('click', clickDelete);

  return placesItem;
}

function cardDeleteFunc(evt) {
  const cardDelete = evt.target.closest('.places__item');
  cardDelete.remove();
}

 initialCards.forEach(function (cardContent) {
  const currentCard = createCard(cardContent.name, cardContent.link, cardDeleteFunc);
  placesList.append(currentCard);
});