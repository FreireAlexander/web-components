export class card extends HTMLElement  {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        console.log("Hola Mundo, creando tarjeta");
    }

    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <article>
            <h3>Card Title</h3>
            </article>
            ${this.getStyle()}
        `;
        return template;
    }

    getStyle(){
        return `
            <style>
                h3{
                    color: navy;
                }
            </style>
        `;
    }

    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback(){
        this.render();
    }
}

customElements.define("zero-card", card);
