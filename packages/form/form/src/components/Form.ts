export class FormComponent extends HTMLElement {
  private formElement!: HTMLFormElement;
  private formData!: FormData;
  handleFormSubmit(formData: FormData) {
    return formData;
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.formData = new FormData();
  }
  connectedCallback() {
    this.render();
    this.formElement = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    if (this.formElement) {
      this.formElement.addEventListener('submit', this.handleSubmit);
    }
    const cancelButton = this.shadowRoot?.querySelector('#cancel-button');
    if (cancelButton) {
      cancelButton.addEventListener('click', this.handleCancelButtonClick);
    }
  }

  private handleCancelButtonClick = () => {
    this.clearFormFields();
    console.log("canceled")
  }

  private handleSubmit = (event:Event) => {
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
          this.formData.append(input.name, input.value);
          console.log(this.formData)
        }

        if (input.type === 'email' && !this.validateEmail(input.value)) {
          isValid = false;
          input.classList.add('error');
        }
      });
    }

    if (isValid) {
      this.clearFormFields();
      const submittedData = this.handleFormSubmit(this.formData);
      console.log(submittedData);
      return submittedData;
    } else {
      console.log('Form validation failed'); // Reset the isValidEmail property for subsequent form submissions
      return null;
    }
    

  }

  private validateEmail(email: string): boolean {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }



  private clearFormFields() {
    const inputFields = this.formElement?.querySelectorAll('input');
    const textArea = this.formElement?.querySelectorAll('textarea')
    if (inputFields) {
      inputFields.forEach((input: HTMLInputElement) => {
        input.value = '';
      });
    }
    if (textArea) {
      textArea.forEach((textarea: HTMLTextAreaElement) => {
        textarea.value = '';
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
        ${parsedFields
          .map(
            (field: any) => `<div class="form-field">
                ${field.title?`<label class="label">${field.title}${field.required ? `<span class="star">*</span>` : ``}</label>`:``}
                ${field.types === 'textarea'
                ? `<textarea name="${field.name}"  ${field.required ? 'required' : ''}></textarea>`
                :
              field.types === 'radio'
                ? field.options
                  .map(
                    (option: string) => `
                            <input type="radio" id="${option}" name="${field.name}" value="${option}" ${field.required ? 'required' : ''}>
                            <label for="${option}">${option}</label>
                          `
                  )
                  .join('')
                : field.types === 'select'
                  ? `
                            <select name="${field.name}" ${field.required ? 'required' : ''}>
                              ${field.options
                    .map((option: string) => `<option value="${option}">${option}</option>`)
                    .join('')}
                            </select>
                          ` 
                :`<input  class="input" name="${field.name}" type="${field.type}" ${field.required ? 'required' : ''}>`
              }
              </div>`
          )
          .join('')}
        <div class="total-div">
          <div class="space-div"></div>
          <div class="buttons">
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button" >Cancel</button>
          </div>
        </div>
      </form>
      `;
    }
  }
}

customElements.define('form-component', FormComponent);
