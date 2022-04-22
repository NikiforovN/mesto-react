

export default class FormValidator{
  constructor(data, formElement){
    this._formSelector=data.formSelector
    this._inputSelector=data.inputSelector
    this._submitButtonSelector=data.submitButtonSelector
    this._inactiveButtonClass=data.inactiveButtonClass
    this._inputErrorClass=data.inputErrorClass
    this._errorClass=data.errorClass
    this._buttonElement=formElement.querySelector(this._submitButtonSelector);
    this._inputList=Array.from(formElement.querySelectorAll(this._inputSelector));
    this._formElement=formElement
    
  }

  //функция открытия ошибки
_showError(inputElement, errorMessage){
  const errorElement = this._formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
}

//функция скрытия ошибки
_hideError(inputElement) {
  const errorElement = this._formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = " ";
}

//проверка валидности инпута
_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showError(
      inputElement,
      inputElement.validationMessage
    );
  } else this._hideError(inputElement);
}

//функция изменения состояния кнопки сабмита
_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this.disableSubmitButton(this._buttonElement);
  } else {
    this._enableSubmitButton(this._buttonElement);
  }
}

//выключение кнопки
disableSubmitButton(){
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute("disabled", "disabled");
}

//включение кнопки
_enableSubmitButton() {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.removeAttribute("disabled", "disabled");
}

// функция добавления слушателей на текущее изменения инпута
_setEventListeners(){
  //получаем массив инпутов
 
  //получаем кнопку сабмита из формы
  
  this._toggleButtonState();
  //на каждый инпут в форме вешаем слушатель, проверяем его валидность и переключаем состояние кнопки
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input",  () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
  this._formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

//функция проверки наличия хотя бы одного невалидного инпута в форме
_hasInvalidInput(){
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функция включения валидации
enableValidation() {
  this._setEventListeners();
  }

}

