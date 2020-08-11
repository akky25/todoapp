import { TodoListModel } from "./model/TodoListModel.js"
import { TodoItemModel } from "./model/TodoItemModel.js"
import { element, render } from "./view/html-util.js";
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
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        // 追加するTodoアイテムの要素(li要素)を作成する
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
        // チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          // 指定したTodoアイテムの完了状態を反転させる
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
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
