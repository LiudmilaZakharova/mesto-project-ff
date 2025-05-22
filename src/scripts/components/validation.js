// элемент и текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
  // находим элемент ошибки внутри функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};


// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  // находим элемент ошибки внутри функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  // очистим ошибку
  errorElement.textContent = '';
};


// проверяем валидность полей, задаем элемент формы и инпута внутри
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    // выводим касомное сообщение
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError (formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};


// принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны, для такой проверки подходит метод some.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}


// принимает массив полей и элемент кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // если есть хоть один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    // иначе сделай активной
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}


// слушатель для ввсех инпутов
const setEventListeners = (formElement, validationConfig) => {
  // находим все инпуты и кнопки
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  // меняем кнопку
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    // добавляем слушателя для каждого
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};


// валидация всех форм
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  })
};


// очищаем ошибки форм
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError (formElement, inputElement, validationConfig);
  });
  toggleButtonState (inputList, buttonElement, validationConfig);
};

export { enableValidation, clearValidation };
