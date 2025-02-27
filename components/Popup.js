export default class Popup {
        constructor(popupSelector) {
            this._popup = document.querySelector(popupSelector);
        }

        _isOpen = () => this._popup.classList.contains("popup_visible");

        _handleEscapeClose = evt => { if (evt.key === "Escape") this.togglePopup() }

        _addEscapeClose = () => document.addEventListener("keydown", this._handleEscapeClose);

        _removeEscapeClose = () => document.removeEventListener("keydown", this._handleEscapeClose);

        togglePopup = () => {
            this._isOpen() ? this._removeEscapeClose() : this._addEscapeClose();
            this._popup.classList.toggle("popup_visible");
        };

        setEventListeners() {
            this._popup.querySelector(".popup__close").addEventListener("click", this.togglePopup);
            this._popup.addEventListener("click", evt => {
                if (evt.target === this._popup) this.togglePopup();
            });
        }
    }