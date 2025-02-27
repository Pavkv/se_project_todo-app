import * as constants from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import ToDoCounter from "../components/ToDoCounter.js";
import ToDo from "../components/Todo.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const toDoCounter = new ToDoCounter(constants.initialTodos, constants.todoCounterSelector);

const todoList = new Section({
      items: constants.initialTodos,
      renderer: (item) => new ToDo(item, constants.todoSelectors, uuidv4(), toDoCounter).getView()
    },
    constants.todoListSelector);
todoList.renderItems();

const addTodoForm = new PopupWithForm(constants.popupSelector, {
    submit: (popup, evt, inputs) => {
        evt.preventDefault();
        const date = new Date(inputs[1]);
        todoList.addItem({
            name: inputs[0],
            date: date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        });
        toDoCounter.updateTotal(true);
        popup.togglePopup(false);
    }
});
addTodoForm.setEventListeners();

document.querySelector(".button_action_add").addEventListener("click", () => addTodoForm.togglePopup());

const todoFormValidation = new FormValidator(constants.validationConfig, addTodoForm.getPopupForm());
todoFormValidation.enableValidation();