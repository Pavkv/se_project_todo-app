import * as constants from "../utils/constants.js";
import ToDo from "../components/Todo.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import FormValidator from "../components/FormValidator.js";
import {ToDoModal} from "../components/Modal.js";

const generateTodo = (data, uId) => { return (new ToDo(data, constants.todoSelectors, uId)).getView() };

constants.initialTodos.forEach((item) => {
  const todo = generateTodo(item, uuidv4());
  document.querySelector(constants.addTodoSelectors.popupList).append(todo);
});

const todoModal = (new ToDoModal(constants.addTodoPopup, constants.addTodoSelectors)).getModal();
const todoFormValidation = new FormValidator(constants.validationConfig, todoModal);
todoFormValidation.enableValidation();