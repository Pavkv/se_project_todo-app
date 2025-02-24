export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity = (inputElement) => {
        inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement);
    };

    _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);

    _toggleButtonState = () => {
        this._buttonElement.disabled = this._hasInvalidInput();
        this._buttonElement.classList.toggle(this._settings.inactiveButtonClass, this._buttonElement.disabled);
    };

    _resetValidation = () => {
        this._inputList.forEach(this._hideInputError);
        this._formElement.reset();
        this._toggleButtonState();
    };

    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener("submit", evt => {
            evt.preventDefault();
            this._resetValidation();
        });
        this._setEventListeners();
    };
}