import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
    }

    _getInputValues() {
        const values = Array.from(this._popup.querySelectorAll(".popup__input"));
        const date = new Date(values[1].value);
        return {
            name: values[0].value,
            date: date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        };
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", evt => this._submit(this, evt));
    }
}