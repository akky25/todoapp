import { TodoListModel } from "./model/TodoListModel.js"
import { TodoItemModel } from "./model/TodoItemModel.js"
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
export class App {
  constructor() {
    // TodoListの初期化
    this.todoListModel = new TodoListModel();
  }

  /**
   * index.jsから呼ばれるメイン関数
   */
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    // TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      // TodoListModelから、todoアイテムリストを取得する
      const todoItems = this.todoListModel.getTodoItems();
      // Todoアイテムリストに対応するViewを生成する
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.todoListModel.updateTodo({ id, completed })
        },
        onDeleteTodo: ({ id }) => {
          this.todoListModel.deleteTodo({ id });
        }
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    // フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = "";
    });
  }
}
