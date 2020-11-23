const template = document.createElement('template')
template.innerHTML = `
    <h1>To do</h1>
    <ul id="todos"></ul>
`;


class TodoList extends HTMLElement {
    constructor() {
        super();
    }

    set todos(value) {
        this._todos = value;
        this._renderList();
    }

    get todos() {

    }

    _renderList() {
        this._todos.forEach((todoItem, index) => {
            let $todoItem = document.createElement("li");
            $todoItem.innerHTML = `${todoItem.text}`;
            this.querySelector("#todos").appendChild($todoItem);
        });
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))
    }
}

window.customElements.define('to-do-list', TodoList);