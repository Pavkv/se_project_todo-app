import {renderTodo} from "../utils/constants.js";

class Modal {
    constructor(popup, settings) {
        this._popup = popup;
        this._settings = settings;
        this._popupForm = this._popup.querySelector(this._settings.popupForm);
    }

    _toggleModal = (isVisible) => {
        this._popup.classList.toggle("popup_visible", isVisible);
    };

    _setEventListenerClick = () => {
        document.querySelector(this._settings.popupOpen).addEventListener("click", () => this._toggleModal(true));
        document.querySelector(this._settings.popupClose).addEventListener("click", () => this._toggleModal(false));
    };

    _setEventListenerSubmit = () => {};

    getPopupForm = () => {
        this._setEventListenerClick();
        this._setEventListenerSubmit();
        return this._popupForm;
    };
}

export class ToDoModal extends Modal {
    constructor(popup, settings) {
        super(popup, settings);
    }

    _setEventListenerSubmit = () => {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const {name, date: dateInput} = evt.target;
            const date = new Date(dateInput.value);
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            renderTodo({
                name: name.value,
                date: date,
            });
            this._toggleModal(false);
        });
    };
}