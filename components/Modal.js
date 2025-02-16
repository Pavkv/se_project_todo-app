import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import ToDo from "../components/Todo.js";
import {todoSelectors} from "../utils/constants.js";

class Modal {
    constructor(popup, settings) {
        this._popup = popup;
        this._settings = settings;
    }

    _openModal = () => { this._popup.classList.add("popup_visible") };

    _closeModal = () => { this._popup.classList.remove("popup_visible") };

    _setEventListenerClick = () => {
        document.querySelector(this._settings.popupOpen).addEventListener("click", () => {
            this._openModal(this._popup);
        });

        document.querySelector(this._settings.popupClose).addEventListener("click", () => {
            this._closeModal(this._popup);
        });
    };

    _setEventListenerSubmit = () => {};

    getModal = () => {
        this._setEventListenerClick();
        this._setEventListenerSubmit();
        return this._popup;
    };
}

export class ToDoModal extends Modal{
    constructor(popup, settings) {
        super(popup, settings);
    }

    _setEventListenerSubmit = () => {
        document.querySelector(this._settings.popupForm).addEventListener("submit", (evt) => {
            evt.preventDefault();
            const name = evt.target.name.value;
            const dateInput = evt.target.date.value;

            // Create a date object and adjust for timezone
            const date = new Date(dateInput);
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

            const values = { name, date };
            const todo = (new ToDo(values, todoSelectors, uuidv4())).getView();
            document.querySelector(this._settings.popupList).append(todo);
            this._closeModal();
        });
    };
}