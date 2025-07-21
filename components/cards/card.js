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


export function cardBlog(item, language, iconsExport) {
    const title = item.title[language] ? item.title[language] : item.title[""];
    const type = item.type[language] ? item.type[language] : item.type[""];
    const tags = item.tags[language] ? item.tags[language] : item.tags[""];
    const description = item.description[language] ? item.description[language] : item.description[""];    
    const cardContentBlog = `
        <figure class="card-cover">
            <img src="${item.href}coverPageSmall.webp" alt="${title}">
            <div class="status ${iconsExport[type] ? iconsExport[type][1] : iconsExport[""][1] }">
                <span class="icon--nf">${iconsExport[type] ? iconsExport[type][0] : iconsExport[""][0] }</span>
                <p>${type}</p>
            </div>
        </figure>
        <div class="card-content">
            <small class="update"> ${translate[language].lastRevision} ${new Date(item.lastUpdate + "T00:00:00-05:00").toLocaleDateString()}</small>
            <h3>${title}</h3>
            <div class="card-data">
                <small><strong>${item.author}</strong> ${translate[language].firstPublishedOn} ${new Date(item.publishDate + "T00:00:00-05:00").toLocaleDateString()}</small>
            </div>
            <div class="card-tags">
                ${tags.map(tag => `
                    <p class="tag ${iconsExport[tag] ? iconsExport[tag][1] : iconsExport[""][1]}">
                        <span class="icon--nf">
                            ${iconsExport[tag] ? iconsExport[tag][0] : iconsExport[""][0]}
                        </span>
                        ${tag}
                    </p>
                    `).join('')}
            </div>
            <div class="card-description">
                <p>${description}</p>
            </div>
            <a href="${item.href}${language}" class="card-button">${translate[language].buttonBlog}</a>
        </div>
    `;
    return cardContentBlog;
}