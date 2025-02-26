export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector("#add-todo-form");
    }

    getPopupForm = () => { return this._popupForm };

    open = () => this._popup.classList.add("popup_visible");

    close = () => this._popup.classList.remove("popup_visible");

    _handleEscapeClose() {
        document.addEventListener("keydown", evt => {
            if (evt.key === "Escape") {
                this.close();
            }
        })
    }

    setEventListeners() {
        this._handleEscapeClose();
        this._popup.querySelector(".popup__close").addEventListener("click", this.close);
        this._popup.addEventListener("click", evt => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}