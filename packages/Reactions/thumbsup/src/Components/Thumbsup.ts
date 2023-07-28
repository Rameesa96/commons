type UserData = {
  createdat: string;
  current_timestamp: string;
  emojiName: string;
  exported_instance: string;
  // Add other properties here...
  isAdmin: boolean;
  personName: string;
};
export class Thumbsup extends HTMLElement {
  count: number | string = "";
  names = "";
  isHovered = false;
  envInfo = {};
  bearerToken = "";
  authAPIUrl = "";
  query = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.query = this.getAttribute("query") || "";
    this.bearerToken = this.getAttribute("bearerToken") || "";
    this.authAPIUrl = this.getAttribute("authAPIUrl") || "";
    this.handleClick = this.handleClick.bind(this);
    await this.getData();
    this.render();
    const Button = this.shadowRoot?.querySelector("#button");
    console.log(Button);
    if (Button) {
      Button.addEventListener("click", this.handleClick);
    }
  }

  private async getData() {
    const queryGetdata = this.getAttribute("queryGetdata");
    const authAPIUrlGetdata = this.getAttribute("authAPIUrlGetdata");
    if (!authAPIUrlGetdata) {
      return;
    }
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      body: JSON.stringify({
        query: queryGetdata,
      }),
    };

    await fetch(authAPIUrlGetdata, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.getPromData.status === "Success") {
          const JSONData = JSON.parse(data.data.getPromData.data) as UserData[];
          // Your code to handle JSONData here
          if (JSONData.length > 0) {
            this.count = JSONData.length;
            const nonAdminUsers = JSONData.filter((user) => !user.isAdmin);
            const nonAdminUserNames = nonAdminUsers
              .map((user) => user.personName)
              .join(", ");
            this.names = nonAdminUserNames;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.render();
  }

  private handleClick() {
    if (!this.authAPIUrl) {
      return;
    }

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "auth-strategy": "next",
        Authorization: this.bearerToken,
      },
      body: JSON.stringify({
        query: this.query,
      }),
    };

    fetch(this.authAPIUrl, data)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        if (
          data.data.addPrometheusData.addPrometheusDataResult.status ===
          "Success"
        ) {
          setTimeout(() => {
            this.getData(); // Call getData after a delay
          }, 5000);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  private render() {
    if (this.shadowRoot) {
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
          <button type="button"  id="button" >
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

customElements.define("thumbs-up", Thumbsup);
