import '../pages/index.css';
import { initialCards, createCard, cardDeleteFunc } from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';

const placesList = document.querySelector('.places__list');

placesList.addEventListener('click', function (evt) {
  if(evt.target.classList.contains('card__like-button')) {
  evt.target.classList.toggle('card__like-button_is-active');
  };
});

initialCards.forEach(function (cardData) {
  const currentCard = createCard(cardData, cardDeleteFunc, cardOpenFunc);
  placesList.append(currentCard);
});


//все попапы
const dialogElement = document.querySelectorAll('.popup');
//элементы форм
const dialogEdit = document.querySelector('.popup_type_edit');
const dialogAddProfile = document.querySelector('.popup_type_new-card');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

//открываем попап с картинкой
function cardOpenFunc(evt) {
  const modalCard = document.querySelector('.popup_type_image');
  const cardElement = evt.target.closest('.places__item');
  modalCard.querySelector('.popup__image').src = evt.target.src;
  modalCard.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;

  console.log(evt.target, evt.target.closest('.places__item'));
  openModal(modalCard);
}

//элементы формы добавления
const formAddCards = document.forms.newPlace;
const placeInput = formAddCards.elements.placeName;
const linkInput = formAddCards.elements.link;

//добавление новой карточки
function addCard () {
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value
  };
  const newCard = createCard(newCardData, cardDeleteFunc, cardOpenFunc);
  placesList.prepend(newCard);
}

//сохраняем новую карточку
function handleImgSubmit(evt) {
  evt.preventDefault();
  addCard();
  formAddCards.reset();}
formAddCards.addEventListener('submit', handleImgSubmit);

//вбивает данные со страницы в попап
function userInfo() {
    nameInput.value = document.querySelector('.profile__title').innerText;
    jobInput.value = document.querySelector('.profile__description').innerText;
};

//вешаем слушателя на кнопку открытия
profileEditBtn.addEventListener('click', () => {
  openModal(dialogEdit);
  userInfo();
});

//слушатель на кнокпе "добавить картинку"
profileAddBtn.addEventListener('click', () => {
  openModal(dialogAddProfile);
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

//элементы формы редактирования
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

//сохраняем введенные данные
function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
};
formElement.addEventListener('submit', handleFormSubmit);