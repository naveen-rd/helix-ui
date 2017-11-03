window.addEventListener('WebComponentsReady', function () {
    const tagName = 'hx-tabpanel';
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
          ${require('../reveal/HxReveal.less')}
          ${require('./HxTabpanel.less')}
      </style>
      ${require('../reveal/HxReveal.html')}
    `;

    class HxTabpanel extends HTMLElement {
        static get is () {
            return tagName;
        }

        constructor () {
            super();
            this.attachShadow({ mode: 'open' });
            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, tagName);
                ShadyCSS.styleElement(this);
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));
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
