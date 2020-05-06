import { LitElement, html } from 'lit-element';

class SearchInput extends LitElement {

  static get properties() {
    return {
      _query: String,
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        div {
          display: flex;
        }
        paper-input {
          width: 100%;
        }
      </style>
      <div>
        <paper-input id="input"></paper-input>
        <paper-button @tap="${this._onSearch}">search</paper-button>
      </div>
    `;
  }

  _onSearch() {
    this.dispatchEvent(new CustomEvent('search', {
      detail: this.shadowRoot.getElementById('input').value,
    }));
  }

}

customElements.define('ptu-search-input', SearchInput);
