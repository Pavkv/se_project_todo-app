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
      renderer: (item) => new ToDo(item, constants.todoSelectors, uuidv4()).getView()
    },
    constants.todoListSelector);
todoList.renderItems();

const popupWithForm = new PopupWithForm(constants.popupSelector, {
  submit: (popup, evt) => {
    evt.preventDefault();
    todoList.addItem(popup._getInputValues());
    toDoCounter.updateTotal(true);
    popup.close();
  }
});
popupWithForm.setEventListeners();

document.querySelector(".button_action_add").addEventListener("click", popupWithForm.open);

const todoFormValidation = new FormValidator(constants.validationConfig, popupWithForm.getPopupForm());
todoFormValidation.enableValidation();