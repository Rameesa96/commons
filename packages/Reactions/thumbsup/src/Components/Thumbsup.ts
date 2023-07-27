type UserData ={
  createdat: string;
  current_timestamp: string;
  emojiName: string;
  exported_instance: string;
  // Add other properties here...
  isAdmin: boolean;
  personName: string;
}
export class Thumbsup extends HTMLElement {
  
    count:number|string = "";
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
        const JSONData = JSON.parse(data.data.getPromData.data) as UserData[];
        // Your code to handle JSONData here
        if (JSONData.length > 0) {
          
          const nonAdminUsers = JSONData.filter(user=> !user.isAdmin);
          const nonAdminUserNames = nonAdminUsers.map(user=> user.personName).join(', ');
          this.count = nonAdminUsers.length;
          this.names = nonAdminUserNames;
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
        return response.json();
      })
      .then(data => {
        if (data.data.addPrometheusData.addPrometheusDataResult.status==="Success"){
          setTimeout(() => {
            this.getData(); // Call getData after a delay
          }, 5000);
        }
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
          padding: 0.4rem 0.5rem;

}
.count{
  margin-left:.25rem;
}
.tooltip-info {
    display: none;
   text-align: center;
   width: 200px!important;
   height: auto!important;
    background-color: #142f58;
    border-radius: 0.25rem;
    color:white;
    padding:2rem;
}
button{
  border-radius:15rem;
  border:none;
}
button:hover {
  border:none
}


button:hover + .tooltip-info {
  display: block;
}
        </style>
      <div>
        <span" class="button" style="position: relative">
          <button type="button"  id="cancel-button" >
          <span class="text">Follow 👍
          <span class="count" thumbsup_emojiCount" id="thumbsup_emojiCount">${this.count}</span></span>
          </button>
        </span>
        <div class="tooltip-info" style={{ position: 'absolute', right: 0, minWidth: 210, lineHeight: 15, top: -32 }}>
              <div>
                  ${this.names}
               </div>
        </div>
      </div>
    `;
}
    }
}

customElements.define('thumbs-up', Thumbsup);
