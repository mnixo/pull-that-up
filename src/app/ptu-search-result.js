import { LitElement, html } from 'lit-element';

class SearchResult extends LitElement {

  static get properties() {
    return {
      result: Object,
    };
  }

  constructor() {
    super();
    this.result = null;
  }

  render() {
    return html`
      <div>${this.result.name}</div>
      <div>${this.result.path}</div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('result')) {
      this.dispatchEvent(new CustomEvent('request-chunk', {
        detail: {
          name: this.result.name,
          cb: this._onChunk,
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  _onChunk(chunk) {
    console.log(chunk);
  }

}

customElements.define('ptu-search-result', SearchResult);
