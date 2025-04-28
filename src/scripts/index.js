import '../pages/index.css';
import { createCard, deleteCardFunc, downLike } from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {initialCards} from './components/cards.js';

const placesList = document.querySelector('.places__list');

const dialogElement = document.querySelectorAll('.popup');

//элементы форм
const dialogEdit = document.querySelector('.popup_type_edit');
const dialogNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//элементы попапа с картинкой
const modalCardImg = document.querySelector('.popup_type_image');
const popupImg = modalCardImg.querySelector('.popup__image');
const popupCaption = modalCardImg.querySelector('.popup__caption');

//элементы формы добавления карточки
const formAddCards = document.forms.newPlace;
const placeInput = formAddCards.elements.placeName;
const linkInput = formAddCards.elements.link;

//элементы формы редактирования
const formEditProfile = document.forms.editProfile;
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

//элементы профиля
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description')

initialCards.forEach(function (cardData) {
  const currentCard = createCard(cardData, deleteCardFunc, openCardFunc, downLike);
  placesList.append(currentCard);
});

//открываем попап с картинкой
function openCardFunc(evt) {
  const cardElement = evt.target.closest('.places__item');
  const cardTitle = cardElement.querySelector('.card__title');
  popupImg.src = evt.target.src;
  popupCaption.textContent = cardTitle.textContent;

  openModal(modalCardImg);
};

//сохраняем новую карточку
function handleImgSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value
  };
  const newCard = createCard(newCardData, cardDeleteFunc, openCardFunc);
  placesList.prepend(newCard);
  formAddCards.reset();
  closeModal(formAddCards);
};
formAddCards.addEventListener('submit', handleImgSubmit);

//слушатель на кнопке "добавить картинку"
profileAddButton.addEventListener('click', () => {
  openModal(dialogNewCard);
});

//сохраняем введенные данные
function handleFormEditSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameProfileInput.value;
    userJob.textContent = jobProfileInput.value;
    closeModal(formEditProfile);
};
formEditProfile.addEventListener('submit', handleFormEditSubmit);

//вбивает данные со страницы в попап
profileEditButton.addEventListener('click', () => {
  openModal(dialogEdit);
  nameProfileInput.value = userName.textContent;
  jobProfileInput.value = userJob.textContent;
});


//закрывает попап кликом (варианты)
dialogElement.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close') 
        || evt.target.classList.contains('popup') 
        || evt.target.classList.contains('popup__button')) { 
      closeModal(popup);
    }
  })
});