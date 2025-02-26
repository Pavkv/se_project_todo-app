export default class ToDoCounter {
    constructor(todos, selector) {
        this._element = document.querySelector(selector);
        this._completed = todos.filter(todo => todo.completed).length;
        this._total = todos.length;
        this._updateText();
    }

    updateCompleted = (increment) => {
        increment ? this._completed++ : this._completed--;
        this._updateText();
    };

    updateTotal = (increment) => {
        increment ? this._total++ : this._total--;
        this._updateText();
    };

    _updateText() {
        this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
}