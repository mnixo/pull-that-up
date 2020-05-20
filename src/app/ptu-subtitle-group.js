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
      ${this._renderSubtitles(this.group)} 
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
