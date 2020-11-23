class Switch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const lightBulbDiv = document.createElement('div');
        lightBulbDiv.className = "light-switch";
        lightBulbDiv.id = "bulb";

        const lightBulbButton = document.createElement('button');
        lightBulbButton.className = "switch";
        lightBulbButton.textContent = "Turn on/off"
        lightBulbButton.id = "lightBulbButton";

        this.appendChild(lightBulbDiv)
        this.appendChild(lightBulbButton)

        lightBulbButton.addEventListener("click", this.changeColor)
    }

    changeColor() {
        // Door wat moet ik document.queryselector vervangen om this te kunnen gebruiken?
        const bulb = document.querySelector('#bulb')
        if (bulb.style.backgroundColor === "grey") {
            bulb.style.backgroundColor = "yellow";
        } else {
            bulb.style.backgroundColor = "grey"
        }
    }
}

window.customElements.define('light-switch', Switch)
