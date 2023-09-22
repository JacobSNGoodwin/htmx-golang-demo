import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('provider-login')
export class ProviderLogin extends LitElement {
  // Define scoped styles right with your component, in plain CSS

  // Declare reactive properties
  @property()
  name?: string = 'Worldliness and such';

  // Render the UI as a function of component state
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
