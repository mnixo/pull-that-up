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
    url += `q=${query}`;
    url += '+path:/data/chunks';
    url += '+repo:mnixo/pull-that-up';
    url += '&per_page=3';
    fetch(url).then(r => r.json()).then(json => cb(json));
  }

  getSubtitles(name, cb) {
    let url = `https://raw.githubusercontent.com/mnixo/pull-that-up/master/data/subtitles/${name}`;
    fetch(url).then(r => r.json()).then(json => cb(json));
  }

}

customElements.define('ptu-github-api', GitHubAPI);
