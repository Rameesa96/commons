export class Thumbsup extends HTMLElement {
    count = null;
    names = '';
    isHovered = false;
    envInfo = {};
    constructor() {
        super();
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.getData()
        this.render();
    }
getData(){
  const queryGetdata = this.getAttribute('queryGetdata')
  const authAPIUrlGetdata= this.getAttribute('authAPIUrlGetdata')
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    body: JSON.stringify({
      query: `${queryGetdata}`
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
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}
    handleMouseEnter() {
        this.isHovered = true;
        this.render();
    }

    handleMouseLeave() {
        this.isHovered = false;
        this.render();
    }

    handleClick() {
      const query = this.getAttribute('query')
      const bearerToken = this.getAttribute('bearerToken')
      const authAPIUrl:string = this.getAttribute('authAPIUrl')
      const data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "auth-strategy": "next",
          "Authorization": bearerToken
        },
        body: JSON.stringify({
          query: `${query}`
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
        <span class="slds-m-right_x-small slds-m-right_x-bottom" style="position: relative"
          onMouseEnter="${this.handleMouseEnter}"
          onMouseLeave="${this.handleMouseLeave}">
          <button onClick="${this.handleClick}" style="border: none; cursor: pointer" class="tooltip-info-link social-proof-emoji thumbsup_click checked" title="thumbsup" id="thumbsup_click" data-emoji="thumbsup">
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
