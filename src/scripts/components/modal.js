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

export {openModal, closeModal}