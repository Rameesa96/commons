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
         
          
          form {
            padding: 1rem;
            border-radius: 4px;
          }
          
          label {
            display: block;
            width:10% !important;
            margin-bottom: 0.5rem;
          }
          
          input {
            width: 90% !important;
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
          .buttons{
            display:flex;
            gap:2px;
          }
          .form-field{
            display:flex;
            width:100%;
          }
          .space-div{
            width:10%;
          }
        </style>
        <form>
           ${parsedFields.map((field:any) => `<div class="form-field"><label>${field.title}</label><input type="text" name="${field.name}"></div>`).join('')}
<div>
<div class="space-div"></div>
<div class="buttons"><button type="submit">Submit</button>
        <button type="button" id="cancel-button">Cancel</button>
</div></div>
        </form>
      `;
      const cancelButton = this.shadowRoot.querySelector('#cancel-button');
      if (cancelButton) {
        cancelButton.addEventListener('click', this.clearFormFields);
      }
    }
  }
}

customElements.define('form-component', FormComponent);
