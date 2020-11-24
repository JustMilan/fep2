const template = document.createElement('template')
template.innerHTML = `
    <li class="item">
        <input type="checkbox">
        <label></label>
    </li>`

class TodoItem extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['checked'];
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))

        this._renderTodoItem();

        this.addEventListener("click", this.test);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            // console.log("in attributeChangedCallback")
            const changedTodoEvent = new CustomEvent("changedTodo", {bubbles: true, detail: this.getAttribute("index")});
            this.dispatchEvent(changedTodoEvent);
        }
    }


    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this.querySelector('.item').classList.add('completed');
        } else {
            this.querySelector('.item').classList.remove('completed');
        }

        this.querySelector('label').innerHTML = this._text;
    }

    test() {
        console.log("voor: ->  " + this.getAttributeNames());
        if (this.hasAttribute('checked')) {
            this.removeAttribute('checked');
        } else {
            this.setAttribute('checked', "");
        }
        this._renderTodoItem();
        console.log("na: -->  " + this.getAttributeNames());
        console.log(this.classList)
    }

    set index(value) {
        this._index = value;
    }

    get index() {
        return this._index;
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    get _text() {
        return this.getAttribute("text");
    }
}

window.customElements.define('to-do-item', TodoItem);