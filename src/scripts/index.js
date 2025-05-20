import "../pages/index.css";
import { createCard, deleteCardFunc, downLike } from "./components/card.js";
import { openModal, closeModal, savingButtonText, saveButtonText } from "./components/modal.js";
// import {initialCards} from './components/cards.js';
import { validationConfig } from "./components/config.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { profileData, initialCards, editProfileApi, newCardApi, deleteCardApi, likeCardApi, dislikeCardApi, editAvatarApi } from "./components/api.js";

const placesList = document.querySelector(".places__list");

const popupList = document.querySelectorAll(".popup");

// кнопки вызова попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileImgEditButton = document.querySelector(".profile__image");

// попапы редактирования, добавления и удаления карточки
const dialogEdit = document.querySelector(".popup_type_edit");
const dialogNewCard = document.querySelector(".popup_type_new-card");
const dialogDeleteCard = document.querySelector(".popup_type_delete-card");
const dialogAvatarEdit = document.querySelector(".popup_type_edit-img");

const deleteCardButton = document.querySelector(".popup_type_delete-card__button");

// попап с картинкой и элементы
const modalCardImg = document.querySelector(".popup_type_image");
const popupImg = modalCardImg.querySelector(".popup__image");
const popupCaption = modalCardImg.querySelector(".popup__caption");

// форма добавления карточки и элементы
const formAddCards = document.forms.newPlace;
const placeInput = formAddCards.elements.placeName;
const linkInput = formAddCards.elements.link;

// форма редактирования и элементы
const formEditProfile = document.forms.editProfile;
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

// форма обновления аватара
const formEditAvatar = document.forms.editProfileAvatar;
const avatarLinkInput = formEditAvatar.elements.avatar;

// элементы профиля
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");

let userId = null;
let idCardForDelete = null;
let cardForDelete = null;

enableValidation(validationConfig);

// Создаем карточки и загружаем UserInfo
Promise.all([profileData(), initialCards()])
  .then(([userData, cards]) => {   
    userAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userName.textContent = userData.name;
    userJob.textContent = userData.about;
    userId = userData._id;
    cards.forEach(function (cardData) {
      const allowDelete = (userId == cardData.owner._id);
      // CASE B
      const isLiked = cardData.likes.map(
        function (likeObj) {return likeObj._id;}).includes(userData._id);
      // CASE A
      // let isLiked = false;// cardData.likes.includes(userId);
      // cardData.likes.forEach(function (likeObj) {
      //   if (likeObj._id == userData._id)
      //   {
      //     isLiked = true;
      //   }
      // })
    const currentCard = createCard(cardData, handleDeleteCard, openCardFunc, handleLikeCard, allowDelete, isLiked);
    placesList.append(currentCard);
    });
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен", err);
  }); // если что-то не так


// открываем попап с картинкой
function openCardFunc({ name, link }) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(modalCardImg);
};

// сохраняем новую карточку
function handleImgSubmit(evt) {
  evt.preventDefault();
  savingButtonText(dialogNewCard);
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value
  };

  newCardApi(newCardData)
    .then((res) => {
      const newCard = createCard(res, handleDeleteCard, openCardFunc, handleLikeCard, /*allowDelete=*/ true);
      placesList.prepend(newCard);  
      formAddCards.reset();
      closeModal(dialogNewCard);
      clearValidation (formAddCards, validationConfig);
      saveButtonText(dialogNewCard);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
      closeModal(dialogNewCard);
      clearValidation (formAddCards, validationConfig);
      saveButtonText(dialogNewCard);
    });
};

formAddCards.addEventListener('submit', handleImgSubmit);

// слушатель на кнопке "добавить картинку"
profileAddButton.addEventListener("click", () => {
  openModal(dialogNewCard);
});

// открывает модалку редактирования аватара
profileImgEditButton.addEventListener("click", () => {
  openModal(dialogAvatarEdit);
});

// редактирование аватарки
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  savingButtonText(dialogAvatarEdit);
  const profileAvatarLink = {avatar: avatarLinkInput.value};
  editAvatarApi(profileAvatarLink)
  .then((res) => {
     userAvatar.style.backgroundImage = `url(${res.avatar})`;
     closeModal(dialogAvatarEdit);
     saveButtonText(dialogAvatarEdit);
     clearValidation(dialogAvatarEdit, validationConfig);
  })
  .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
      closeModal(dialogAvatarEdit);
      saveButtonText(dialogAvatarEdit);
      clearValidation(dialogAvatarEdit, validationConfig);
  });
};

formEditAvatar.addEventListener("submit", handleAvatarSubmit);

// сохраняем введенные данные
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  savingButtonText(dialogEdit);

  const dataEditForm = {
    name: nameProfileInput.value,
    about: jobProfileInput.value,
  };
  editProfileApi(dataEditForm)
    .then((res) => {
       userName.textContent = res.name;
       userJob.textContent = res.about;
    })
    .then(() => {
      closeModal(dialogEdit);
      saveButtonText(dialogEdit);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
      closeModal(dialogEdit);
      saveButtonText(dialogEdit);
    });
};

formEditProfile.addEventListener("submit", handleFormEditSubmit);

// вбивает данные со страницы в попап
profileEditButton.addEventListener("click", () => {
  openModal(dialogEdit);
  nameProfileInput.value = userName.textContent;
  jobProfileInput.value = userJob.textContent;
  clearValidation(formEditProfile, validationConfig);
});

// закрывает попап кликом (варианты)
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closeModal(popup);
    }
  });
});

  // удаляем карточку
  function handleDeleteCard (cardElement, cardId) {
    idCardForDelete = cardId;
    cardForDelete = cardElement;
    openModal(dialogDeleteCard);

  deleteCardButton.addEventListener("click", () => {
    deleteCardApi(idCardForDelete)
      .then((res) => {
       deleteCardFunc(cardForDelete);
      })
      .catch((err) => {
       console.log("Ошибка. Запрос не выполнен", err);
      });
    closeModal(dialogDeleteCard)});
  };

  // Ставим лайки
  function handleLikeCard(cardId, cardLikeButton, cardLikeCount) {
    const updateLikeCounter = (res) => { 
      cardLikeCount.textContent = res.likes.length;
    };
    const isLikeActivated = downLike(cardLikeButton);
    // обновляет количество лайков
    if (isLikeActivated){
      likeCardApi(cardId)
        .then (updateLikeCounter);
    } else {
      dislikeCardApi(cardId)
        .then (updateLikeCounter);
    }
  };
  



  




 