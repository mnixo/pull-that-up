import { LitElement, html } from 'lit-element';

class SubtitleGroup extends LitElement {

  static get properties() {
    return {
      group: Array,
      videoId: String,
    };
  }

  constructor() {
    super();
    this.group = [];
    this.videoId = null;
  }

  render() {
    return html`
      <style>
        paper-card {
          width: 100%;
          padding: 1em;
        }
      </style>
      <paper-card>
        ${this._renderSubtitles(this.group)}
      </paper-card> 
    `;
  }

  _renderSubtitles(group) {
    if (!group) {
      return null;
    }
    return group.subtitles.map(subtitle => {
      const url = `https://youtu.be/${this.videoId}?t=${parseInt(subtitle.start)}`;
      return html`
        <div>${subtitle.text} <a href="${url}">(${subtitle.start})</a></div>
      `;
    });
  }

}

customElements.define('ptu-subtitle-group', SubtitleGroup);
