import {toDoCounter} from "../pages/index.js";

export default class ToDo {
    constructor(data, selectors, id) {
        this._data = {...data, completed: data.completed ?? false};
        this._selectors = selectors;
        this._dueDate = new Date(data.date);
        this._id = `todo-${id}`;
        this._element = document.querySelector(this._selectors.template).content.cloneNode(true);
        this._checkElement = this._element.querySelector(this._selectors.completed);
    }

    _setEventListeners = () => {
        this._element.querySelector(this._selectors.deleteButton)
        .addEventListener("click", evt => {
            evt.target.closest(".todo").remove();
            toDoCounter.updateTotal(false);
        });
        this._checkElement.addEventListener("click",
            () => toDoCounter.updateCompleted(!!this._checkElement.checked));
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
        this._setEventListeners();
        this._element.querySelector(this._selectors.name).textContent = this._data.name;
        this._checkElement.checked = this._data.completed;
        this._checkElement.id = this._id;
        this._element.querySelector(this._selectors.label).setAttribute("for", this._id);
        this._setDueDate();
        return this._element;
    };
}