import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    // 追加するTodoアイテムの要素(li要素)を作成する
    const todoItemElement = todoItem.completed
      ? element`<li>
                  <input type="checkbox" class="checkbox" checked>
                  <s>${todoItem.title}</s>
                  <button class="delete">x</button>
                </li>`
      : element`<li>
                  <input type="checkbox" class="checkbox">
                  ${todoItem.title}
                  <button class="delete">x</button>
                </li>`;

    // チェックボックスがトグルしたときのイベントにパラメーターの更新イベントリスナーを登録
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    // 削除ボタン(x)がクリックされたときのイベントにパラメーターの削除イベントリスナーを登録
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}