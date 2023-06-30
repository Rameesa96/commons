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

    

    // Perform your custom form submission logic here
    console.log('Form submitted');
 
    // You can send the form data to a server, update state, or perform any other desired action

    // Clear form fields
    this.clearFormFields();
  }

  private clearFormFields() {
    const inputFields = this.formElement?.querySelectorAll('input');
    if (inputFields) {
      inputFields.forEach((input: HTMLInputElement) => {
        input.value = '';
      });
    }
  }

  private render() {
    const fields = this.getAttribute('fields') ?? '[]'; // Provide a default value of '[]' if the attribute is null
    const parsedFields = JSON.parse(fields);

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
          ${parsedFields.map((field: any) => `<input type="text" name="${field.name}" placeholder="${field.placeholder}">`).join('')}
          <button type="submit">Submit</button>
        </form>
      `;
    }
  }
}

customElements.define('form-component', FormComponent);
