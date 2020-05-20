import { LitElement, html } from 'lit-element';

class SearchResults extends LitElement {

  static get properties() {
    return {
      _results: Array,
      _term: String,
    };
  }

  constructor() {
    super();
    this._results = [];
    this._term = null;
  }

  render() {
    return html`
      <style>
        ptu-search-result:not(:last-child) {
          margin-bottom: 1em;
        }
      </style>
      ${this._renderResults(this._results)}
    `;
  }

  show(json, term) {
    this._results = json.items;
    this._term = term;
  }

  _renderResults(results) {
    return results.map(result => html`
      <ptu-search-result .result="${result}" .term="${this._term}"></ptu-search-result>
    `);
  }

}

customElements.define('ptu-search-results', SearchResults);
