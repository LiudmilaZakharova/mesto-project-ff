function openModal(element) {
  element.classList.add('popup_is-opened');

  function downEsc (evt) {
    if(evt.key === 'Escape') { 
      closeModal(element);
      document.removeEventListener('keydown',downEsc);
    }
  }
  document.addEventListener('keydown', downEsc);
};


function closeModal(element) {
  element.classList.remove('popup_is-opened');
};

const dialogElement = document.querySelectorAll('.popup');

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

export {openModal, closeModal}