import * as constants from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import {ToDoModal} from "../components/Modal.js";

constants.initialTodos.forEach((item) => {
  constants.renderTodo(item);
});

const popupForm = (new ToDoModal(constants.addTodoPopup, constants.addTodoSelectors)).getPopupForm();
const todoFormValidation = new FormValidator(constants.validationConfig, popupForm);
todoFormValidation.enableValidation();