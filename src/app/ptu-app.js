import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-styles/paper-styles';
import './ptu-github-api';
import './ptu-search-input';
import './ptu-search-result';
import './ptu-search-results';
import './ptu-subtitle-group';
import './ptu-subtitle-groups';

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
      <style>
        :host,
        ptu-search-results {
          display: flex;
          flex-direction: column;
        }
        ptu-search-input,
        ptu-search-results {
          margin: 1em 1em 0 1em;
        }
      </style>
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
