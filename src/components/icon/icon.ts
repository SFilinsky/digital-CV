import './icon.scss';

import ICON_DEFINITIONS from '../../assets/icons/icon-definitions';

class CVIconComponent extends HTMLElement {

    static observedAttributes = ['name'];

    private imageEl = document.createElement('img');

    constructor() {
        super();
    }
    //
    // attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    //     this.updateImageElement(newValue);
    // }
    //
    // private updateImageElement(name: string | null) {
    //     const isNameDefined = !!name;
    //     if (!isNameDefined) {
    //         this.detachImage();
    //         return;
    //     }
    //
    //     const imageParamList = this.getIconParameterList(name);
    //
    //     const isImageParamListDefined = !!imageParamList;
    //     if (!isImageParamListDefined) {
    //         this.detachImage();
    //         return;
    //     }
    //
    //     Object.assign(this.imageEl, imageParamList); // Apply parameters to image element
    //     this.attachImage();
    // }
    //
    // private getIconParameterList(name: string): Partial<HTMLImageElement> | undefined {
    //     // return ICON_DEFINITIONS[name];
    // }
    //
    // private attachImage() {
    //     this.appendChild(this.imageEl);
    // }
    //
    // private detachImage() {
    //     this.removeChild(this.imageEl);
    // }
}

customElements.define('cv-icon', CVIconComponent);
