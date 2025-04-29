import '../pages/index.css';
import { createCard, deleteCardFunc, downLike } from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {initialCards} from './components/cards.js';

const placesList = document.querySelector('.places__list');

const popupList = document.querySelectorAll('.popup');

// кнопки вызова попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// попапы редактирования и добавления карточки
const dialogEdit = document.querySelector('.popup_type_edit');
const dialogNewCard = document.querySelector('.popup_type_new-card');

// попап с картинкой и элементы
const modalCardImg = document.querySelector('.popup_type_image');
const popupImg = modalCardImg.querySelector('.popup__image');
const popupCaption = modalCardImg.querySelector('.popup__caption');

// форма добавления карточки и элементы
const formAddCards = document.forms.newPlace;
const placeInput = formAddCards.elements.placeName;
const linkInput = formAddCards.elements.link;

// форма редактирования и элементы
const formEditProfile = document.forms.editProfile;
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

// элементы профиля
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description')

initialCards.forEach(function (cardData) {
  const currentCard = createCard(cardData, deleteCardFunc, openCardFunc, downLike);
  placesList.append(currentCard);
});

// открываем попап с картинкой
function openCardFunc({name, link}) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(modalCardImg);
};

// сохраняем новую карточку
function handleImgSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value
  };
  const newCard = createCard(newCardData, deleteCardFunc, openCardFunc);
  placesList.prepend(newCard);
  formAddCards.reset();

  closeModal(dialogNewCard);
};
formAddCards.addEventListener('submit', handleImgSubmit);

// слушатель на кнопке "добавить картинку"
profileAddButton.addEventListener('click', () => {
  openModal(dialogNewCard);
});

// сохраняем введенные данные
function handleFormEditSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameProfileInput.value;
    userJob.textContent = jobProfileInput.value;

    closeModal(dialogEdit);
};
formEditProfile.addEventListener('submit', handleFormEditSubmit);

// вбивает данные со страницы в попап
profileEditButton.addEventListener('click', () => {
  openModal(dialogEdit);
  nameProfileInput.value = userName.textContent;
  jobProfileInput.value = userJob.textContent;
});


// закрывает попап кликом (варианты)
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close') 
        || evt.target.classList.contains('popup') 
        ){ 
      closeModal(popup);
    }
  })
});