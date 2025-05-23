import "../pages/index.css";
import { createCard, deleteCardFunc, likeButtonClick } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
// import {initialCards} from './components/cards.js';
import { validationConfig } from "./components/config.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { profileData, initialCards, editProfileApi, newCardApi, deleteCardApi, editAvatarApi } from "./components/api.js";

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
      const currentCard = createCard(cardData, handleDeleteCard, openCardFunc, likeButtonClick, userId);
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
  renderLoading (dialogNewCard, false, "Сохранение...");
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value
  };

  newCardApi(newCardData)
    .then((res) => {
      const newCard = createCard(res, handleDeleteCard, openCardFunc, likeButtonClick, userId);
      placesList.prepend(newCard);  
      formAddCards.reset();
      closeModal(dialogNewCard);
      renderLoading (dialogNewCard, true, "Сохранить");
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    })
    .finally (() => {
      renderLoading (dialogNewCard, true, "Сохранить");
    });
};

formAddCards.addEventListener('submit', handleImgSubmit);

// слушатель на кнопке "добавить картинку"
profileAddButton.addEventListener("click", () => {
  openModal(dialogNewCard);
  clearValidation (formAddCards, validationConfig);
});

// открывает модалку редактирования аватара
profileImgEditButton.addEventListener("click", () => {
  openModal(dialogAvatarEdit);
  clearValidation(formEditAvatar, validationConfig);
});

// редактирование аватарки
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading (dialogAvatarEdit, false, "Сохранение...");
  const profileAvatarLink = {avatar: avatarLinkInput.value};
  editAvatarApi(profileAvatarLink)
  .then((res) => {
      userAvatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(dialogAvatarEdit);
      renderLoading (dialogAvatarEdit, true, "Сохранить");
  })
  .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
  })
  .finally (() => {
      renderLoading (dialogAvatarEdit, true, "Сохранить");
  });
};

formEditAvatar.addEventListener("submit", handleAvatarSubmit);

// сохраняем введенные данные
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading (dialogEdit, false, "Сохранение...");

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
      renderLoading (dialogEdit, true, "Сохранить");
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    })
    .finally (() => {
      renderLoading (dialogEdit, true, "Сохранить");
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


// Слушатель на подтверждение удаления карточки
deleteCardButton.addEventListener("click", () => {
  deleteCardApi(idCardForDelete)
    .then(() => {
      deleteCardFunc(cardForDelete);
      closeModal(dialogDeleteCard);
      idCardForDelete = null;
      cardForDelete = null;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    });
});


// Инициализация удаления карточки
function handleDeleteCard (cardElement, cardId) {
  idCardForDelete = cardId;
  cardForDelete = cardElement;
  openModal(dialogDeleteCard);
};


// меняем текст на кнопке сохранения
function renderLoading (element, isActive, elementText) {
  const buttnSave = element.querySelector('.popup__button');
  buttnSave.textContent = elementText;
  if (isActive) {
    buttnSave.removeAttribute('disabled');
  } else {
    buttnSave.setAttribute('disabled', 'true');
  }
}
