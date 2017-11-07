import debounce from 'lodash/debounce';
import { Position } from '../../lib/position';

window.addEventListener('WebComponentsReady', function () {
    const tagName = 'hx-popover';
    const template = document.createElement('template');

    template.innerHTML = `
      <style>${require('./HxPopover.less')}</style>
      ${require('./HxPopover.html')}
    `;

    class HxPopover extends HTMLElement {
        static get is () {
            return tagName;
        }

        static get observedAttributes () {
            return [
                'open',
                'position',
            ];
        }

        set open (value) {
            if (value) {
                this.setAttribute('open', '');
            } else {
                this.removeAttribute('open');
            }
        }

        get open () {
            return this.hasAttribute('open');
        }

        set position (value) {
            if (value) {
                this.setAttribute('position', value);
            } else {
                this.removeAttribute('position');
            }
        }

        get position () {
            if (this.hasAttribute('position')) {
                return this.getAttribute('position');
            }

            return undefined;
        }

        constructor () {
            super();
            this.attachShadow({ mode: 'open' });
            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, tagName);
                ShadyCSS.styleElement(this);
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this._toggle = this._toggle.bind(this);
            this._reposition = this._reposition.bind(this);
            this._closeOnBackdropClick = this._closeOnBackdropClick.bind(this);
        }

        connectedCallback () {
            if (!this.id) {
                return;
            }

            this._target = document.querySelector('[data-popover=' + this.id + ']');
            if (!this._target) {
                return;
            }

            this._target.addEventListener('click', this._toggle);
            window.addEventListener('resize', debounce(this._reposition, 100));
            document.addEventListener('click', this._closeOnBackdropClick);
        }

        disconnectedCallback () {
            if (!this._target) {
                return;
            }

            this._target.removeEventListener('click', this._toggle);
            window.removeEventListener('resize', debounce(this._reposition, 100));
            document.removeEventListener('click', this._closeOnBackdropClick);
            this._target = null;
        }

        attributeChangedCallback (attr, oldValue, newValue) {
            switch (attr) {
                case 'open':
                    this.setAttribute('aria-hidden', newValue !== '');
                    break;
                case 'position':
                    if (oldValue !== newValue) {
                        this._reposition();
                    }
                    break;
            }
        }

        _toggle () {
            this.open = !this.open;
            this._reposition();
        }

        _reposition () {
            if (this.open) {
                let offset = Position.getOffsets(this, this._target, this.position);

                this.position = offset.position;
                this.style.top = offset.y + 'px';
                this.style.left = offset.x + 'px';
            }
        }

        _closeOnBackdropClick (event) {
            if ((event.target !== this._target) && (!event.target.closest(tagName))) {
                this.open = false;
            }
        }
    }

    customElements.define(HxPopover.is, HxPopover)
});
