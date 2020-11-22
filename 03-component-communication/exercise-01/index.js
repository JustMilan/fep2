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
        lightBulbButton.addEventListener("click", i => {
            if (lightBulbDiv.hasAttribute("show") === true) {
                lightBulbDiv.removeAttribute("show");
            } else {
                lightBulbDiv.setAttribute("show", "");
            }
        });
    }
}

window.customElements.define('light-switch', Switch)