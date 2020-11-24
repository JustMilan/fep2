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

        this.querySelector('input').addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onToggle', {
                detail: this.getAttribute('index'),
                // By setting composed to true, the event will bubble outside of the Shadow DOM
                composed: true,
                bubbles: true
            }));
        });

        this._renderTodoItem();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            console.log("in attributeChangedCallback")
            this._checked = this.hasAttribute('checked');
        }
    }


    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this.querySelector('.item').classList.add('completed');
            this.querySelector('label').setAttribute('checked', '');
        } else {
            this.querySelector('.item').classList.remove('completed');
            this.querySelector('label').removeAttribute('checked');
        }

        this.querySelector('label').innerHTML = this._text;
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