import { LitElement, html } from 'lit-element';

class SubtitleGroup extends LitElement {

  static get properties() {
    return {
      group: Array,
    };
  }

  constructor() {
    super();
    this.group = Object;
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
      return html`
        <div>${subtitle.text}</div>
      `;
    });
  }

}

customElements.define('ptu-subtitle-group', SubtitleGroup);
