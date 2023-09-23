import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// import cssString from '../../../public/output.css';

@customElement('signup-signin')
export class SingupSignin extends LitElement {
  // connectedCallback() {
  //   super.connectedCallback();
  //   console.log('cssString', cssString);
  // }
  // static styles = css`
  //   ${unsafeCSS(css)}
  // `;
  // Declare reactive properties
  @property()
  name?: string = 'Worldlinessly';

  // Render the UI as a function of component state
  render() {
    return html`<p class="text-purple-600">Heyo</p>`;
  }
}
