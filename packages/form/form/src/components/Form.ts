function handleSubmit(event: Event) {
  event.preventDefault();



  // Perform form submission logic or AJAX request
  console.log('Form submitted:');
}

export function Form(containerId: string) {
  const formContainer = document.getElementById(containerId);

  const formHTML = `
    <form id="myForm">
      <label for="name">Name</label>
      <input type="text" id="name" />

      <label for="email">Email</label>
      <input type="email" id="email" />

      <button type="submit">Submit</button>
    </form>
  `;

  if (formContainer) {
    formContainer.innerHTML = formHTML;

    const form = document.getElementById('myForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
  }
}
