export default class ToDo {
    constructor(data, selectors, id) {
        this._data = {...data, completed: data.completed ?? false};
        this._selectors = selectors;
        this._dueDate = new Date(data.date);
        this._id = `todo-${id}`;
    }

    _getTemplate = () => this._element = document.querySelector(this._selectors.template).content.cloneNode(true);

    _setEventListeners = () => {
        this._element.querySelector(this._selectors.deleteButton).addEventListener("click", () => this._element.remove());
    };

    _setDueDate = () => {
        if (!isNaN(this._dueDate)) {
            this._element.querySelector(this._selectors.date).textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
        }
    };

    getView = () => {
        this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(this._selectors.name).textContent = this._data.name;
        const checkElement = this._element.querySelector(this._selectors.completed);
        checkElement.checked = this._data.completed;
        checkElement.id = this._id;
        this._element.querySelector(this._selectors.label).setAttribute("for", this._id);
        this._setDueDate();
        return this._element;
    };
}