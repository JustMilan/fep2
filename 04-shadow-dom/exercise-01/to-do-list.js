import './to-do-item.js';

class ToDoList extends HTMLElement {
    _shadowRoot = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
        <style>
      to-do-list {
        display: block;
        font-family: sans-serif;
        text-align: center;
      }
    
      to-do-list button {
        border: none;
        cursor: pointer;
      }
    
      to-do-list ul {
        list-style: none;
        padding: 0;
      }
    </style>

        <h1>To do</h1>
        <input type="text" placeholder="Add a new to do"/>
        <button>Voeg toe</button>

        <ul id="todos"></ul>
        `;

        this._shadowRoot.querySelector('button').addEventListener('click', this._addTodo.bind(this));
        this._shadowRoot.addEventListener("onToggle", event => this._toggleTodo(event));
    }

    _addTodo() {
        if (this._shadowRoot.querySelector('input').value.length > 0) {
            this._todos.push({
                text: this._shadowRoot.querySelector('input').value,
                checked: false
            })
            this._renderTodoList();
            this._shadowRoot.querySelector('input').value = '';
        }
    }

    _toggleTodo(event) {
        const item = this.todos[event.detail];
        item.checked = !item.checked;

        this._renderTodoList();
    }

    _renderTodoList() {
        this._shadowRoot.querySelector('#todos').innerHTML = '';

        this._todos.forEach((todo, index) => {
            let $todoItem = document.createElement('to-do-item');
            $todoItem.setAttribute('text', todo.text);
            // if the to do is checked, set the attribute, else; omit it.
            if (todo.checked) {
                $todoItem.setAttribute('checked', '');
            }
            // By setting index we have some state to keep track of the index
            // of the to do
            $todoItem.setAttribute('index', index);
            this._shadowRoot.querySelector('#todos').appendChild($todoItem);
        });
    }

    set todos(value) {
        this._todos = value;
        this._renderTodoList();
    }

    get todos() {
        return this._todos;
    }
}

window.customElements.define('to-do-list', ToDoList);