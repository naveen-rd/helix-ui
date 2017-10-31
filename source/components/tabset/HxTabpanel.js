window.addEventListener('WebComponentsReady', function () {
    const tagName = 'hx-tabpanel';
    const template = document.createElement('template');

    template.innerHTML = `
        <style>${require('./HxTabpanel.less')}</style>
        <hx-reveal no-summary>
            <slot></slot>
        </hx-reveal>
    `;

    class HxTabpanel extends HTMLElement {
        static get is () {
            return tagName;
        }

        static get observedAttributes () {
            return ['open'];
        }

        constructor () {
            super();
            this.attachShadow({ mode: 'open' });
            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, tagName);
                ShadyCSS.styleElement(this);
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._reveal = this.shadowRoot.querySelector('hx-reveal');
        }

        attributeChangedCallback (attr, oldValue, newValue) {
            const hasValue = newValue !== null;
            this._reveal.open = hasValue;
        }

        set open (value) {
            if (Boolean(value)) {
                this.setAttribute('open', '');
            } else {
                this.removeAttribute('open');
            }
        }

        get open () {
            return this.hasAttribute('open');
        }
     }
    customElements.define(HxTabpanel.is, HxTabpanel)
});
