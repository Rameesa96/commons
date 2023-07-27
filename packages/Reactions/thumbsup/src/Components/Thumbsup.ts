export class Thumbsup extends HTMLElement {
    count = '';
    names = '';
    isHovered = false;
    envInfo = {};
   bearerToken=""
   authAPIUrl=""
   query=""
   
    constructor() {
        super();
      this.attachShadow({ mode: 'open' });
    }

  async connectedCallback() {
    this.query = this.getAttribute('query')||"";
    this.bearerToken = this.getAttribute('bearerToken') || "";
    this.authAPIUrl = this.getAttribute('authAPIUrl')||""
    this.handleClick = this.handleClick.bind(this);
    await this.getData();
    this.render();
    const cancelButton = this.shadowRoot?.querySelector('#cancel-button');
    console.log(cancelButton)
    if (cancelButton) {
    cancelButton.addEventListener('click', this.handleClick);
    }
  }

  private async getData(){
  const queryGetdata = this.getAttribute('queryGetdata')
  console.log("beare", this.bearerToken)
  console.log("authAPIUrl:", this.authAPIUrl);
  console.log("query:",this.query);
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

 await fetch(authAPIUrlGetdata, data)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.data.getPromData.status === "Success") {
        const JSONData = JSON.parse(data.data.getPromData.data);
        // Your code to handle JSONData here
        if (JSONData.length > 0) {
this.count=JSONData.length
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
    this.render()
}
  private handleClick() {
    console.log("beareh", this.bearerToken)
    console.log("authAPIUrlh:",this.authAPIUrl);
    console.log("queryh:", this.query);
    console.log("clicked");
    if (!this.authAPIUrl) {
      console.error('authAPIUrlGetdata is null.');
      return;
    }
 
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "auth-strategy": "next",
        "Authorization": this.bearerToken
      },
      body: JSON.stringify({
        query: this.query
      })
    };

    fetch(this.authAPIUrl, data)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        this.getData();
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
        <style>
.text{
  color:#080707;
      font-weight: 700;
      font-size:14px;
          padding: 0.25rem 0.5rem;

}
.count{
  margin-left:.25rem;
}
button{
  border-radius:15rem;
  border:none;
}
        </style>
      <div>
        <span" class="button" style="position: relative">
          <button type="button"  id="cancel-button" >
          <span class="text">Follow 👍
          <span class="count" thumbsup_emojiCount" id="thumbsup_emojiCount">${this.count}</span></span>
          </button>
        </span>
      </div>
    `;}
    }
}

customElements.define('thumbs-up', Thumbsup);
