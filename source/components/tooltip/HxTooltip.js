import { Position } from '../../lib/position'
import debounce from 'lodash/debounce'

window.addEventListener('WebComponentsReady', function () {
    const tagName = 'hx-tooltip';
    const template = document.createElement('template');

    template.innerHTML = `
      <style>${require('./HxTooltip.less')}</style>
      ${require('./HxTooltip.html')}`;

    class HxTooltip extends HTMLElement {
        static get is () {
            return tagName;
        }

        static get observedAttributes () {
            return ['open','position','trigger'];
        }

        constructor () {
            super();
            this.attachShadow({ mode: 'open' });
            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, tagName);
                ShadyCSS.styleElement(this);
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.initialPosition = this.position
            this._show = this._show.bind(this);
            this._hide = this._hide.bind(this);
            this._toggle = this._toggle.bind(this);
            this._reposition = this._reposition.bind(this);
            this._closeOnBackgroundClick = this._closeOnBackgroundClick.bind(this);
        }

        connectedCallback () {
            this._target = document.querySelector('[data-tooltip=' + this.id + ']');
            if (!this.hasAttribute('role')) {this.setAttribute('role', 'tooltip');}
            if (!this._target) {return;}
            this._connectHandlers()
        }

        disconnectedCallback () {
            if (!this._target) {return;}
            this._destoryAllHandlers()
        }

        attributeChangedCallback (attr, oldValue, newValue) {
            switch (attr) {
                case 'open':
                    this.setAttribute('aria-hidden', newValue !== '');
                    break;
            }
        }

        _hide () {
            if (this._showTimer) {
                clearTimeout(this._showTimer);
            }
            this._hideTimer = setTimeout(() => { this.open = false;}, 1600);
            this.position = this.initialPosition
        }

        _show () {
            if (this._hideTimer) {
                clearTimeout(this._hideTimer);
            }
            this._showTimer = setTimeout(() => {
                this.open = true;
                this._setPosition()
            }, 500);
        }

        _toggle () {
            this.open = !this.open;
            if (this.open) {this._setPosition()} else {this.position = this.initialPosition}
        }

        _reposition () {
            if (this.open) {
                this._setPosition();
            }
        }
        
        _closeOnBackgroundClick (event) {
            if (this._isBackground(event)) {
                this.open = false;
            }
        }

        _connectHandlers () {
            if (this.trigger === 'click') {
                this._addClickHandlers()
            } else {
                this._addHoverHandlers()
            }
        }

        _destoryAllHandlers () {
            window.removeEventListener('resize', debounce(this._reposition,100));
            document.removeEventListener('click', this._closeOnBackgroundClick);
            this._target.removeEventListener('focus', this._show);
            this._target.removeEventListener('blur', this._hide);
            this._target.removeEventListener('mouseenter', this._show);
            this._target.removeEventListener('mouseleave', this._hide);
            this._target.removeEventListener('click', this._toggle);
            this._target = null;
        }

        _addHoverHandlers () {
            window.addEventListener('resize', debounce(this._reposition,100));
            this._target.addEventListener('focus', this._show);
            this._target.addEventListener('blur', this._hide);
            this._target.addEventListener('mouseenter', this._show);
            this._target.addEventListener('mouseleave', this._hide);
        }

        _addClickHandlers () {
            window.addEventListener('resize', debounce(this._reposition,100));
            this._target.addEventListener('click', this._toggle);
            document.addEventListener('click', this._closeOnBackgroundClick);
        }

        _setPosition () {
            var offset = Position.getOffsets(this,this._target,this.position);
            this.style.top = offset.y + 'px';
            this.style.left = offset.x + 'px';
            this.position = offset.position
        }

        _isBackground (event) {
            let clickedTarget = event.target === this._target || 
                event.target.parentElement === this._target   || 
                event.target.parentElement.parentElement === this._target
            let parentIsNotTagName = !event.target.closest(tagName)

            return (!clickedTarget && parentIsNotTagName)
        }

        set position (value) {
            if (value) {
                this.setAttribute('position', value);
            } else {
                this.removeAttribute('position');
            }
        }

        get position () {
            return this.getAttribute('position')
        }

        set trigger (value) {
            if (value) {
                this.setAttribute('trigger', value);
            } else {
                this.removeAttribute('trigger');
            }
        }

        get trigger () {
            return this.getAttribute('trigger');
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

    }
    customElements.define(HxTooltip.is, HxTooltip)
})
