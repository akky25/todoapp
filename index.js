import { App } from "./src/App.js";

// App.jsに渡すHTML要素
const formElement = document.querySelector('#js-form');
const inputElement = document.querySelector('#js-form-input');
const containerElement = document.querySelector('#js-todo-list');
const todoItemCountElement = document.querySelector('#js-todo-count');

const app = new App({
  formElement,
  inputElement,
  containerElement,
  todoItemCountElement
});
window.addEventListener("load", () => {
  app.mount();
});