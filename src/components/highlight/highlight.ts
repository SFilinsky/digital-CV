import './highlight.scss';

/**
 * This component was extracted since it was making a lot of dirt:
 * - repeated dozens of times
 * - two <strong> and <em> tags for each entry
 * - a lot of custom styles at the time
 */
class CVHighlightComponent extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('cv-highlight', CVHighlightComponent);
