export class FormComponent extends HTMLElement {
  private formElement!: HTMLFormElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.formElement = this.shadowRoot?.querySelector('form') as HTMLFormElement; // Use type assertion to assign the correct type
    if (this.formElement) {
      this.formElement.addEventListener('submit', this.handleSubmit);
    }
  }

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log('Form submitted');
    // Perform your form submission logic here
  }

  private render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
      :host {
            display: block;
            font-family: Arial, sans-serif;
            margin: 1rem;
          }
          
          form {
            background-color: #f0f0f0;
            padding: 1rem;
            border-radius: 4px;
          }
          
          label {
            display: block;
            margin-bottom: 0.5rem;
          }
          
          input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 1rem;
          }
          
          button {
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          button:hover {
            background-color: #0056b3;
          }
      </style>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" />

        <label for="email">Email</label>
        <input type="email" id="email" />

        <label for="number">Contact Number</label>
        <input type="number" id="number" />
        <button type="submit">Submit</button>
      </form>
    `;
    }
  }
}

customElements.define('form-component', FormComponent);
