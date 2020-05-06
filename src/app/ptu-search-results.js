import { LitElement, html } from 'lit-element';

class SearchResults extends LitElement {

  static get properties() {
    return {
      _results: Array,
    };
  }

  constructor() {
    super();
    this._results = [];
  }

  render() {
    return html`
      ${this._renderResults(this._results)}
    `;
  }

  show(json) {
    this._results = json.items;
  }

  _renderResults(results) {
    return results.map(result => html`
      <ptu-search-result .result="${result}"></ptu-search-result>
    `);
  }

}

customElements.define('ptu-search-results', SearchResults);
