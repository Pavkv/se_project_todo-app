import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector(".popup__form");
    }

    _getInputValues() {
        return Array.from(this._popup.querySelectorAll(".popup__input"))
            .map(input => { return input.value });
    }

    getPopupForm = () => { return this._popupForm };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", evt => this._submit(this, evt, this._getInputValues()));
    }
}