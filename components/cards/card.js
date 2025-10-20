export class card extends HTMLElement {
    static get observedAttributes() {
        return [
            "title",
            "author",
            "version",
            "date",
            "category",
            "description",
            "buttonhref",
            "buttontext",
            "img",
            "img_alt"
        ];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.props = {};
        this.updatePropsFromAttributes();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.props[name.toLowerCase()] = newValue;
            this.render(); // Reactualizar en cada cambio
        }
    }

    updatePropsFromAttributes() {
        card.observedAttributes.forEach(attr => {
            this.props[attr.toLowerCase()] = this.getAttribute(attr) ?? "";
        });
    }

    render() {
        this.shadowRoot.innerHTML = ""; // Limpiar previo contenido
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    getTemplate() {
        const template= document.createElement("template");
        const property = this.props;

        template.innerHTML = `
            <article class="card">
                ${property.img
                        ? `<section class="card-cover">
                            ${property.img ? `<img src="${property.img}" alt="${property.img_alt || ''}">` : ''}
                            ${property.category ? `<span class="tag--category">${property.category}</span>` : ''}
                            </section>`
                        : ''
                }
                <header class="card-info">
                    <section class="meta-data">
                    <h3 class="card-title">
                    Será que spí?
                        <slot name="title">${property.title}</slot>
                    </h3>
                    <h3 class="card-title">${property.title}</h3>
                    
                        <div class="card-data">
                            ${property.author ? `<span class="author">${property.author}</span>` : ''}
                            ${property.date ? `<time class="date" datetime="${property.date}">${property.date}</time>` : ''}
                        </div>
                        ${property.version ? `<span class="current-version">${property.version}</span>` : ''}
                    </section>
                    <section class="tags-container">
                        <!-- Aquí podrías hacerlo dinámico luego -->
                        <span class="card-tag">AutoCAD</span>
                        <span class="card-tag">Python</span>
                        <span class="card-tag">Engineering</span>
                    </section>
                </header>
                <section class="card-desc">
                    <p>${property.description}</p>
                </section>
                ${property.buttonhref && property.buttontext
                    ? `<footer class="card-footer">
                          <a class="card-button" href="${property.buttonhref}">${property.buttontext}</a>
                       </footer>`
                    : ''
                }
            </article>
            ${this.getStyle()}
        `;
        return template;
    }

    getStyle(){
        return `
            <style>
                *{
                    margin: 0;
                    padding: 0;
                    font-size: 62.5%;
                }

                /* Card Style */
                article.card{
                    display: grid;
                    grid-template-rows: auto 1fr 1fr 1fr;
                    width: 250px;
                    height: 320px;

                    background-color: lightsteelblue;

                    border-radius: 8px;
                    border: 4px solid #F0FFFF;
                    border-style: outset;
                    border-left: 0;
                    border-top: 0;
                    border-right: 0;
                }
                /* Card Cover Style */
                section.card-cover{
                    display: grid;
                    position: relative;
                }

                section.card-cover img{
                    width: 100%;
                    height: 75px;

                    border-radius: 8px 8px 0 0;
                    object-fit: cover;
                }

                span.tag--category{
                    position: absolute;
                    top: 0;
                    /*bottom: 0;*/
                    left: 100%;
                    transform: translateX(-100%);

                    width: fit-content;
                    padding: 4px 8px;
                    margin: 0;

                    color: whitesmoke;
                    background-color: green;
                    border-radius: 0 8px 0 0;

                    font-size: 0.8rem;
                }

                /* Card Meta-Data */

                header.card-info {
                    position: relative;
                    height: fit-content;
                    padding: 12px 8px 8px 8px;
                }

                h3.card-title{
                    font-size: 1.4rem;
                    color: yellow;
                }
                
                [slot="title"]{
                    font-size: 2rem;
                    color: green;
                }

                ::slotted(slot[name="title"]){
                    font-size: 1.4rem;
                    color: blue;
                }

                div.card-data{
                    display: flex;
                    justify-content: left;
                    column-gap: 8px;
                }

                .author, .date {
                    font-size: 0.8rem;
                    color: rgb(15, 15, 15);
                }

                span.current-version{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: fit-content;

                    padding-right: 4px;
                    padding-top: 4px;

                    font-size: 0.6rem;
                }

                section.tags-container{
                    display: flex;
                    justify-content: left;
                    flex-wrap: wrap;
                    column-gap: 4px;
                    row-gap: 4px;
                    padding-top: 4px;
                }

                span.card-tag{
                    display: flex;
                    align-items: center;
                    font-size: 0.8rem;
                    background-color: lightslategray;
                    padding: 4px;
                    border-radius: 4px;
                }

                span.card-tag svg{
                    width: 0.8rem;
                    height: 0.8rem;
                    padding-right: 4px;
                }


                /* Card resume or description */

                section.card-desc{
                    display: block;
                    padding: 4px 8px;
                }

                section.card-desc p{
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    font-size: 0.8rem;
                    font-style: normal;
                }

                /*Card footer */

                footer.card-footer{
                    display: grid;
                    justify-content: center;
                    align-content: center;
                }

                footer.card-footer a.card-button{
                    display: grid;
                    justify-content: center;
                    width: fit-content;
                    height: fit-content;

                    padding: 4px;
                    
                    border: 1px solid grey;
                    border-radius: 4px;

                    color: rgb(34, 34, 34);
                    text-decoration: none;
                    font-style: normal;
                    font-size: 1rem;

                    cursor: pointer;
                }
            </style>
        `;
    }
}

customElements.define("zero-card", card);
