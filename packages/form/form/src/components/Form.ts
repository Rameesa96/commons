export class FormComponent extends HTMLElement {
  private formElement!: HTMLFormElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.formElement!= this.shadowRoot?.querySelector('form'); // Add null check here
    if (this.formElement) {
      this.formElement.addEventListener('submit', this.handleSubmit);
    }
  }

  private handleSubmit = (event: Event) => {
    // event.preventDefault();
    // const formData = new FormData(this.formElement); // Use definite assignment assertion
    // const formEntries = Array.from(formData.entries());

    // // Process form data
    // console.log(formEntries);
    console.log("form submitted")
  }

  private render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
        /* Add your component styles here */
      </style>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" />

        <label for="email">Email</label>
        <input type="email" id="email" />

        <button type="submit">Submit</button>
      </form>
    `;
    }
  }
}

customElements.define('form-component', FormComponent);
