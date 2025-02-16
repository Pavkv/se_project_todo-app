export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError = (inputElement) => {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    disableButton = () => {
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
        buttonElement.disabled = true;
        buttonElement.classList.add(this._settings.inactiveButtonClass);
    }

    resetValidation = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        inputList.forEach((inputElement) => this._hideInputError(inputElement));
    };

    _setEventListeners = () => {
        const inputList = Array.from(
            this._formElement.querySelectorAll(this._settings.inputSelector),
        );
        const buttonElement = this._formElement.querySelector(
            this._settings.submitButtonSelector,
        );

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}