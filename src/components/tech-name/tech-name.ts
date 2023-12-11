import './tech-name.scss';

class CVTechNameComponent extends HTMLElement {
    constructor() {
        super();

        /*
          Reattach content to nested <span> element.
          This is needed to allow both text and background gradient
         */
        const nested =  document.createElement('span');
        nested.innerHTML = this.innerHTML;
        this.innerHTML = "";

        this.appendChild(nested);
    }
}

customElements.define('cv-tech-name', CVTechNameComponent);
