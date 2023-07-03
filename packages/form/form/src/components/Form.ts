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

    // Validate the form fields
    const inputFields = this.shadowRoot?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    console.log(inputFields)
    let isValid = true;

    if (inputFields) {
      inputFields.forEach((input: HTMLInputElement) => {
        if (input.value === '') {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && !this.validateEmail(input.value)) {
          isValid = false;
          input.classList.add('error');
        }
      });
    }

    if (isValid) {
      // Perform your custom form submission logic here
      console.log('Form submitted');

      // Clear form fields
      this.clearFormFields();
    } else {
      console.log('Form validation failed');
    }
  }

  private validateEmail(email: string): boolean {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
            width:25% !important;
            margin-bottom: 0.5rem;
          }
          
          input {
            width: 75% !important;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 1rem;
          }
          textarea{
            width: 75% !important;
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
          .error {
  border: 1px solid red;
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
            width:25%;
          }
          .total-div{
            display:flex;

          }
          .star{
            margin-left:2px;
            color:red;
          }
        </style>
        <form>
           ${parsedFields.map((field: any) => `<div class="form-field">
                  <label>${field.title}${field.required ? `<span class="star">*</span>` : ``}</label>
                  ${field.types === 'textarea'
               ? `<textarea name="${field.name}"  ${field.required ? 'required' : ''}></textarea>`
             : `<input  name="${field.name}" type="${field.type}" ${field.required ? 'required' : ''}>`
                  }
                </div>`).join('')}
            <div class="total-div">
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
