export class Thumbsup extends HTMLElement {
    count = '';
    names = '';
    isHovered = false;
    envInfo = {};
  private formElement!: HTMLButtonElement;
    constructor() {
        super();
      this.attachShadow({ mode: 'open' });
    }

  connectedCallback() {
    this.getData();
    this.render();
    const cancelButton = this.shadowRoot?.querySelector('#cancel-button');
    if (cancelButton) {
      cancelButton.addEventListener('click', this.handleClick);
    }
  }

private getData(){
  const queryGetdata = this.getAttribute('queryGetdata')
  const authAPIUrlGetdata= this.getAttribute('authAPIUrlGetdata')
  if (!authAPIUrlGetdata) {
    console.error('authAPIUrlGetdata is null.');
    return;
  }
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    body: JSON.stringify({
      query: queryGetdata
    })
  };

  fetch(authAPIUrlGetdata, data)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.data.getPromData.status === "Success") {
        const JSONData = JSON.parse(data.data.getPromData.data);
        // Your code to handle JSONData here
        if (JSONData.length > 0) {
this.count=JSONData.length
this.render()
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}
  private handleClick(event: Event) {
    event.preventDefault();
    console.log("clicked");

    const query = this.getAttribute('query') || "";
    const bearerToken = this.getAttribute('bearerToken') || "";
    const authAPIUrl = this.getAttribute('authAPIUrl') || "";
    console.log("authAPIUrl:", authAPIUrl);
    console.log("query:", query);

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "auth-strategy": "next",
        "Authorization": bearerToken
      },
      body: JSON.stringify({
        query: query
      })
    };

    fetch(authAPIUrl, data)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        console.log("Response data:", data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }


    private render() {
        if(this.shadowRoot){
        this.shadowRoot.innerHTML = `
      <div>
        <span class="slds-m-right_x-small slds-m-right_x-bottom" style="position: relative">
          <button type="button" id="cancel-button">Follow 👍${this.count}</button>
        </span>
      </div>
    `;}
    }
}

customElements.define('thumbs-up', Thumbsup);
