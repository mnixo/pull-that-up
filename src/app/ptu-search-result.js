import { LitElement, html } from 'lit-element';

class SearchResult extends LitElement {

  static get properties() {
    return {
      result: Object,
      term: String,
      _subtitles: Array,
    };
  }

  constructor() {
    super();
    this.result = null;
    this.term = null;
    this._subtitles = [];
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
    console.log({
      subtitles,
      term: this.term,
      matchingSubtitles,
      results,
    });
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
        score += this._countOccurrences(s.text, w);
      });
      if (score) {
        matchingSubtitles.push({
          subtitle: s,
          score,
          index: subtitles.indexOf(s),
        });
      }
    });
    return matchingSubtitles;
  }

  _countOccurrences(string, word) {
    return string.split(' ').filter(w => w === word).length;
  }

}

customElements.define('ptu-search-result', SearchResult);
