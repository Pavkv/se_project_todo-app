export default class ToDo {
    constructor(data, selectors, id, toDoCounter) {
        this._data = {...data, completed: data.completed ?? false};
        this._selectors = selectors;
        this._dueDate = new Date(data.date);
        this._id = `todo-${id}`;
        this._element = document.querySelector(this._selectors.template).content.cloneNode(true);
        this._checkElement = this._element.querySelector(this._selectors.completed);
        this._toDoCounter = toDoCounter;
    }

    _setEventListeners = () => {
        this._element.querySelector(this._selectors.deleteButton)
        .addEventListener("click", evt => {
            if (this._checkElement.checked) {
                this._toDoCounter.updateCompleted(false);
            }
            this._toDoCounter.updateTotal(false);
            evt.target.closest(".todo").remove();
        });
        this._checkElement.addEventListener("click",
            () => this._toDoCounter.updateCompleted(!!this._checkElement.checked));
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