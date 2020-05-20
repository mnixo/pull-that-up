import { LitElement, html } from 'lit-element';

class SubtitleGroups extends LitElement {

  static get properties() {
    return {
      groups: Array,
    };
  }

  constructor() {
    super();
    this.groups = [];
  }

  render() {
    return html`
      <style>
        ptu-subtitle-group:not(:last-child) {
          margin-bottom: 1em;
        }
      </style>
      ${this._renderGroups(this.groups)}
    `;
  }

  _renderGroups(groups) {
    return groups.map(group => {
      return html`
        <ptu-subtitle-group
          .group="${group}"
        ></ptu-subtitle-group>
      `;
    });
  }

}

customElements.define('ptu-subtitle-groups', SubtitleGroups);
