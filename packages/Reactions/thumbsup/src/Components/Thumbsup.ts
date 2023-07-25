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
        this.render();
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
       console.log("clicked")
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
