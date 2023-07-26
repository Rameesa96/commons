export class Thumbsup extends HTMLElement {
    count = '';
    names = '';
    isHovered = false;
    envInfo = {};
    constructor() {
        super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.getData()
        this.render();
      const button = this.shadowRoot?.querySelector('#thumbsup-button');
      if (button) {
        button.addEventListener('click', this.handleClick);
      }
    }
getData(){
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
  private handleClick() {
      console.log("clicked")
      const query = this.getAttribute('query')
      const bearerToken = this.getAttribute('bearerToken')|| ""
      const authAPIUrl = this.getAttribute('authAPIUrl')
      if (!authAPIUrl) {
        console.error('authAPIUrl is null.');
        return;
      }
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

      }


      fetch(authAPIUrl, data)
        .then(response => {
          response.json();
          this.getData()
        }).catch(error => {
          console.log(error);
        });
     }

    private render() {
        if(this.shadowRoot){
        this.shadowRoot.innerHTML = `
      <div>
        <span class="slds-m-right_x-small slds-m-right_x-bottom" style="position: relative">
          <button id="thumbsup-button"  style="border: none; cursor: pointer" class="tooltip-info-link social-proof-emoji thumbsup_click checked" title="thumbsup" id="thumbsup_click" data-emoji="thumbsup">
            <span class="slds-badge font-size-14 thumbsup_Button" id="thumbsup_Button"> Follow 👍
              <span class="slds-m-left_xx-small thumbsup_emojiCount" id="thumbsup_emojiCount">${this.count}</span>
            </span>
          </button>
        </span>
      </div>
    `;}
    }
}

customElements.define('thumbs-up', Thumbsup);
