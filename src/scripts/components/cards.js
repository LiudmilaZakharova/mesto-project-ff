const cardTmp = document.querySelector('#card-template').content;

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


function createCard (cardData, clickDelete, clickImg) {
  const placesItem = cardTmp.querySelector('.places__item').cloneNode(true);
  const deleteBtn = placesItem.querySelector('.card__delete-button');

  const cardName = placesItem.querySelector('.card__title');
  const cardImage = placesItem.querySelector('.card__image');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteBtn.addEventListener('click', clickDelete);
  cardImage.addEventListener('click', clickImg);

  return placesItem;
};

function cardDeleteFunc (evt) {
  const cardDelete = evt.target.closest('.places__item');
  cardDelete.remove();
};

export { cardTmp, initialCards, createCard, cardDeleteFunc };