import { LitElement, html } from 'lit-element';

class SearchResult extends LitElement {

  static get properties() {
    return {
      result: Object,
      term: String,
      _subtitles: Array,
      _subtitleGroups: Array,
      _videoId: String,
    };
  }

  constructor() {
    super();
    this.result = null;
    this.term = null;
    this._subtitles = [];
    this._subtitleGroups = [];
    this._videoId = null;
  }

  render() {
    return html`
      <style>
        paper-card {
          width: 100%;
          padding: 1em;
        }
        ptu-subtitle-groups {
          display: flex;
          flex-direction: column;
          margin-top: 1em;
        }
      </style>
      <paper-card>
        <div>${this.result.name}</div>
        <div>${this.result.path}</div>
        <ptu-subtitle-groups
          .groups="${this._subtitleGroups}"
          .videoId="${this._videoId}"
        ></ptu-subtitle-groups>
      </paper-card>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('result')) {
      this._videoId = this.result.name.replace('.json', '');
      this.dispatchEvent(new CustomEvent('request-subtitles', {
        detail: {
          name: this.result.name,
          cb: this._onSubtitles.bind(this),
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  _onSubtitles(subtitles) {
    this._subtitles = subtitles;
    const matchingSubtitles = this._getMatchingSubtitles(this.term, this._subtitles);
    const results = this._getResults(matchingSubtitles);
    this._subtitleGroups = results;
  }

  _getResults(matchingSubtitles) {
    const results = [];
    matchingSubtitles.forEach(matchingSubtitle => {
      if (results.length) {
        const lastResult = results[results.length - 1];
        const lastResultSubtitles = lastResult.subtitles;
        const lastResultLastSubtitle = lastResultSubtitles[lastResultSubtitles.length - 1];
        if (lastResultLastSubtitle.index === (matchingSubtitle.index - 1)) {
          lastResult.subtitles.push(matchingSubtitle);
        } else {
          results.push({
            subtitles: [ matchingSubtitle ],
          });
        }
      } else {
        results.push({
          subtitles: [ matchingSubtitle ],
        });
      }
    });
    results.forEach(result => {
      result.score = 0;
      result.subtitles.forEach(subtitle => result.score += subtitle.score);
    });
    return results;
  }

  _getMatchingSubtitles(term, subtitles) {
    const matchingSubtitles = [];
    const termWords = this.term.toLowerCase().split(' ');
    subtitles.forEach(s => {
      let score = 0;
      termWords.forEach(w => {
        score += this._countOccurrences(s.text.toLowerCase(), w);
      });
      if (score) {
        s.index = subtitles.indexOf(s);
        s.score = score;
        matchingSubtitles.push(s);
      }
    });
    return matchingSubtitles;
  }

  _countOccurrences(string, word) {
    return string.split(' ').filter(w => w === word).length;
    // return string.split(word).length - 1;
  }

}

customElements.define('ptu-search-result', SearchResult);
