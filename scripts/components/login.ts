import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement('provider-login')
export class ProviderLogin extends LitElement {
  // Declare reactive properties
  @property()
  name?: string = 'Worldliness and such';

  // Render the UI as a function of component state
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
