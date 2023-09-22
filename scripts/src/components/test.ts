import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('test-component')
export class TestComponent extends LitElement {
  // Declare reactive properties
  @property()
  name?: string = 'Worldlinessly';

  // Render the UI as a function of component state
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
