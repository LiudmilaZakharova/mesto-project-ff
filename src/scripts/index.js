import '../pages/index.css';
import {initialCards} from './cards.js';
const placesList = document.querySelector('.places__list');
const cardTmp = document.querySelector('#card-template').content;


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
  // placesItem.addEventListener('click', clickImg);

  return placesItem;
}

function cardDeleteFunc(evt) {
  const cardDelete = evt.target.closest('.places__item');
  cardDelete.remove();
}

initialCards.forEach(function (cardData) {
  const currentCard = createCard(cardData, cardDeleteFunc, cardOpenFunc);
  placesList.append(currentCard);
});


//элементы формы добавления
const formAddCards = document.forms.newPlace;
const placeInput = formAddCards.elements.placeName;
const linkInput = formAddCards.elements.link;


function addCard () {
  const cardDt = {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value
  };
  const cntCard = createCard(cardDt, cardDeleteFunc, cardOpenFunc);
  placesList.prepend(cntCard);
}

function handleImgSubmit(evt) {
  evt.preventDefault();
  addCard();
  formAddCards.reset();}

formAddCards.addEventListener('submit', handleImgSubmit);
 



function cardOpenFunc(evt) {
  const dialogCard = document.querySelector('.popup_type_image');
  const aargagar = evt.target.closest('.places__item');
  const CI = evt.target
  dialogCard.querySelector('.popup__image').src = CI.src;
  dialogCard.querySelector('.popup__caption').textContent = aargagar.querySelector('.card__title').textContent;

  // console.log(evt.currentTarget, evt.target);
  console.log(evt.target, evt.target.closest('.places__item'));
  openPopup(dialogCard);
}


//Функция для лайка, вешаем на список, определяем классами
placesList.addEventListener('click', function (evt) {
  if(evt.target.classList.contains('card__like-button')) {
  evt.target.classList.toggle('card__like-button_is-active');
  };
});




//ищем нужные элементы
const dialogEdit = document.querySelector('.popup_type_edit');
const dialogAddProfile = document.querySelector('.popup_type_new-card');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

//все попапы
const dialogElement = document.querySelectorAll('.popup')

//для кнопка esc
const once = {
  once: true,
};



//функция навештвает класс, открывающий попап
function openPopup(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown',
    (evt) => {
      if(evt.key === 'Escape') { 
        closeModal(element);
      }
    }, once)
}

//вбивает данные со страницы в попап
function userInfo() {
    nameInput.value = document.querySelector('.profile__title').innerText;
    jobInput.value = document.querySelector('.profile__description').innerText;
}

//вешаем слушателя на кнопку открытия
profileEditBtn.addEventListener('click', () => {
  openPopup(dialogEdit);
  userInfo();
});

//слушатель на кнокпе "добавить картинку"
profileAddBtn.addEventListener('click', () => {
  openPopup(dialogAddProfile);
});


//закрывает попап
function closeModal(element) {
  element.classList.remove('popup_is-opened');
}

//закрывает попап кликом на разное
dialogElement.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close') 
        || evt.target.classList.contains('popup') 
      || evt.target.classList.contains('popup__button')) { 
      closeModal(modal);
    }
  })
});


//элементы формы редактирования
const formElement = document.forms.editProfile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

//сохраняет введенные в фрму данные, подставляет на страницу
function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);



 


// //сохраняет и вставляет введенные данные
// function addPlace(placeInputValue, linkInputValue, evt) {
//   evt.preventDefault();
//   const placesItem = cardTmp.querySelector('.places__item').cloneNode(true);
//   document.querySelector('.popup__input_type_card-name').textContent = placeInputValue;
//   document.querySelector('.popup__input_type_url').src = linkInputValue;


//   cardTmp.append(placesItem);
//   // return placesItem;
// }

// formAddCards.addEventListener('submit', addPlace);


// function handleImgSubmit (evt) {
//   evt.preventDefault();
//   addPlace(placeInput.value, linkInput.value);
//   placeInput.value = '';
//   linkInput.value = '';
// };

// formAddCards.addEventListener('submit', handleImgSubmit);




// const popupImgContent = dialogCard.querySelector('.popup__image');
// popupImgContent.src = evt.target.src
// popupImgContent.alt = evt.target.alt
// dialogCard.querySelector('.popup__caption').innerText = evt.target.alt