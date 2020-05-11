import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-styles/paper-styles';
import './ptu-github-api';
import './ptu-search-input';
import './ptu-search-result';
import './ptu-search-results';

class App extends LitElement {

  static get properties() {
    return {

    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <ptu-github-api
        id="github"
      ></ptu-github-api>
      <ptu-search-input
        @search="${this._onSearch}"
      ></ptu-search-input>
      <ptu-search-results
        id="results"
        @request-subtitles="${this._onRequestSubtitles}"
      ></ptu-search-results>
    `;
  }

  getById(id) {
    return this.shadowRoot.getElementById(id);
  }

  _onSearch(e) {
    this.getById('github').search(e.detail, results => this.getById('results').show(results, e.detail));
  }

  _onRequestSubtitles(e) {
    this.getById('github').getSubtitles(e.detail.name, e.detail.cb);
  }

}

customElements.define('ptu-app', App);
