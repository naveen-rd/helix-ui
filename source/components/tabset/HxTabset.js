window.addEventListener('WebComponentsReady', function () {
    const template = document.createElement('template');

    template.innerHTML = `
      <style>${require('./HxTabset.less')}</style>

      <slot name="tab"></slot>
      <slot name="panel"></slot>
    `;


    class HxTabset extends HTMLElement {
        static get is () {
            return 'hx-tabset';
        }

        constructor () {
            super();
            this._onSlotChange = this._onSlotChange.bind(this);            
            this.attachShadow({mode: 'open'});
            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, 'hx-tabset');
                ShadyCSS.styleElement(this);
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        }
     }
    customElements.define(HxTabset.is, HxTabset)
});
