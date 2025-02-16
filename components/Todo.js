export default class ToDo {
    constructor(data, selector, id) {
        this._element = document.querySelector("#todo-template")
            .content
            .querySelector(".todo")
            .cloneNode(true);
        this._data = {
            ...data,
            completed: data.completed ?? false
        };
        this._selector = selector;
        this._dueDate = new Date(data.date);
        this._id = `todo-${id}`;
    }

    _setEventListeners = () => {
        this._element.querySelector(this._selector.deleteButton).addEventListener("click", () => this._element.remove());
    };

    _setDueDate = () => {
        if (!isNaN(this._dueDate)) {
            this._element.querySelector(this._selector.date).textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
        }
    };

    getView = () => {
        this._setEventListeners();
        this._element.querySelector(this._selector.name).textContent = this._data.name;
        this._element.querySelector(this._selector.completed).checked = this._data.completed;
        this._element.querySelector(this._selector.completed).id = this._id;
        this._element.querySelector(this._selector.label).setAttribute("for", this._id);
        this._setDueDate();
        return this._element;
    };
}