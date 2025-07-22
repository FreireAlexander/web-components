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
            "imgalt"
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
        const t = document.createElement("template");
        const p = this.props;

        t.innerHTML = `
            <article class="card">
                ${p.img
                        ? `<section class="card-cover">
                            ${p.img ? `<img src="${p.img}" alt="${p.imgalt || ''}">` : ''}
                            ${p.category ? `<span class="tag--category">${p.category}</span>` : ''}
                            </section>`
                        : ''
                }
                <header class="card-info">
                    <section class="meta-data">
                        <h3 class="card-title">${p.title}</h3>
                        <div class="card-data">
                            ${p.author ? `<span class="author">${p.author}</span>` : ''}
                            ${p.date ? `<time class="date" datetime="${p.date}">${p.date}</time>` : ''}
                        </div>
                        ${p.version ? `<span class="current-version">${p.version}</span>` : ''}
                    </section>
                    <section class="tags-container">
                        <!-- Aquí podrías hacerlo dinámico luego -->
                        <span class="card-tag">AutoCAD</span>
                        <span class="card-tag">Python</span>
                        <span class="card-tag">Engineering</span>
                    </section>
                </header>
                <section class="card-desc">
                    <p>${p.description}</p>
                </section>
                ${p.buttonhref && p.buttontext
                    ? `<footer class="card-footer">
                          <a class="card-button" href="${p.buttonhref}">${p.buttontext}</a>
                       </footer>`
                    : ''
                }
            </article>
            ${this.getStyle()}
        `;
        return t;
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
