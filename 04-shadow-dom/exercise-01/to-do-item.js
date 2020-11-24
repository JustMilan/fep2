const template = document.createElement('template')
template.innerHTML = `
<style>
  li {
    display: block;
    font-family: sans-serif;
  }

  .completed {
    text-decoration: line-through;
  }
</style>

    <li class="item">
        <input type="checkbox">
        <label></label>
    </li>`

class TodoItem extends HTMLElement {
    _shadowRoot = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    static get observedAttributes() {
        return ['checked'];
    }

    connectedCallback() {
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this._shadowRoot.querySelector('input').addEventListener('click', (e) => {
            this._shadowRoot.dispatchEvent(new CustomEvent('onToggle', {
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
            this._shadowRoot._checked = this.hasAttribute('checked');
        }
    }


    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this._shadowRoot.querySelector('.item').classList.add('completed');
            this._shadowRoot.querySelector('label').setAttribute('checked', '');
        } else {
            this._shadowRoot.querySelector('.item').classList.remove('completed');
            this._shadowRoot.querySelector('label').removeAttribute('checked');
        }

        this._shadowRoot.querySelector('label').innerHTML = this._text;
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