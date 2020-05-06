import { LitElement, html } from 'lit-element';

class GitHubAPI extends LitElement {

  static get properties() {
    return {

    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      
    `;
  }

  search(query, cb) {
    let url = 'https://api.github.com/search/code?';
    url += `q=${query}+`;
    url += 'path%3A%2Fdata%2Fchunks+';
    url += 'repo:mnixo/pull-that-up';
    fetch(url).then(r => r.json()).then(json => cb(json));
  }

  getChunk(name, cb) {
    let url = `https://raw.githubusercontent.com/mnixo/pull-that-up/master/data/chunks/${name}`;
    fetch(url).then(r => r.text()).then(text => cb(text));
  }

}

customElements.define('ptu-github-api', GitHubAPI);
