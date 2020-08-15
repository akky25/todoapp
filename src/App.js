import { TodoListModel } from "./model/TodoListModel.js"
import { TodoItemModel } from "./model/TodoItemModel.js"
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
export class App {
  constructor({ formElement, inputElement, containerElement, todoItemCountElement }) {
    // HTML要素
    this.formElement = formElement;
    this.inputElement = inputElement;
    this.containerElement = containerElement;
    this.todoItemCountElement = todoItemCountElement;
    // Viewの初期化
    this.todoListView = new TodoListView();
    // TodoListの初期化
    this.todoListModel = new TodoListModel();
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  /**
   * フォームを送信時に呼ばれるリスナー関数
   * @param {Event} event
   */
  handleSubmit(event) {
    // submitの送信処理を中止
    event.preventDefault();
    // 新しいTodoItemをTodoListへ追加する
    const inputElement = this.inputElement;
    this.handleAdd(inputElement.value);
    inputElement.value = "";
  }

  /**
   * TodoListModelが変更した時に呼ばれるリスナー関数
   */
  handleChange() {
    const containerElement = this.containerElement;
    const todoItemCountElement = this.todoItemCountElement;
    // TodoListModelから、todoアイテムリストを取得する
    const todoItems = this.todoListModel.getTodoItems();
    // Todoアイテムリストに対応するViewを生成する
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      }
    });
    // containerElementの中身をtodoListElementで上書きする
    render(todoListElement, containerElement);
    // アイテム数の表示を更新
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  /**
   * index.jsから呼ばれるメイン関数
   */
  mount() {
    // TodoListModelの状態が更新されたら表示を更新する
    // コールバック関数handleChangeのthisをインスタンスに固定 
    this.todoListModel.onChange(this.handleChange.bind(this));

    // フォームを送信したら、新しいTodoItemModelを追加する
    // コールバック関数handleSubmitのthisをインスタンスに固定 
    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
  }
}
