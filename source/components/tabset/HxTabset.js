window.addEventListener('WebComponentsReady', function () {
    const tagName = 'hx-tabset';
    const template = document.createElement('template');

    template.innerHTML = `
      <style>${require('./HxTabset.less')}</style>
      ${require('./HxTabset.html')}
    `;


    class HxTabset extends HTMLElement {
        static get is () {
            return tagName;
        }

        constructor () {
            super();         
            this.attachShadow({mode: 'open'});
            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, 'hx-tabset');
                ShadyCSS.styleElement(this);
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._tabClick = this.shadowRoot.querySelector('#head');            
            this._onHeadClick = this._onHeadClick.bind(this);
        }

        connectedCallback () {
            // attach a click listener on the head point to _onHeadClick
            this._tabClick.addEventListener('click', this._onHeadClick);
            
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', 'tabset');
            }
        }

        disconnectedCallback () {
        }

        attributeChangedCallback() {
        }

        get tabs () {
            return Array.from(this.querySelectorAll(`span`));
         }

        get panels () {
            return Array.from(this.querySelectorAll('hx-tab'));
         }

        _onHeadClick(event) {
            // iterate over head children with index
            // as iterate, set the tab and appro panel to the appro state
            // array reference of all panels in the body
            // labels[i] and panels[i]
            this.tabs.forEach((tab, index) => {
                // check if event target is that tab
                // if it is that tab, active the tab and content
                // otherwise deactivate
                if (event.target === tab) {
                    tab.classList.add('active');
                    this.panels[index].open = true;
                } else {
                tab.classList.remove('active');
                this.panels[index].open = false;
                }
            });
        }
    }
    customElements.define(HxTabset.is, HxTabset)
});
