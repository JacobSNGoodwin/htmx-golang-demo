import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// import cssString from '../../../public/output.css';

@customElement('sample-comp')
export class SampleComp extends LitElement {
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
