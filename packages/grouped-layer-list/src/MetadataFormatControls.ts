import { MetadataFormat, MetadataOutput } from "./types";

function handleLinkClick(this: MetadataLinksList, e: Event) {
    
    // Stop the page from navigating
    e.preventDefault();
}

export class MetadataLinksList extends HTMLTableElement {

    static get observedAttributes() {
        return ["href", "layers"];
    }


    /**
     * Creates a new instance
     */
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
    }

    /**
     * Creates the table content.
     * @param serviceUrl Map Service URL
     */
    private createLinks() {
        const formats = new Array<MetadataFormat>("fgdc", "iso19139");
        const outputs = new Array<MetadataOutput | "xml">("html", "xml");
        const frag = document.createDocumentFragment();
        const thead = document.createElement("thead");
        frag.appendChild(thead);
        const tbody = document.createElement("tbody");
        frag.appendChild(tbody);
        let headerRow = thead.insertRow();
        
        // TODO: Add column for map service root + sublayers.

        const th = document.createElement("th");
        th.textContent = "Metadata for...";
        headerRow.appendChild(th);


        for (const format of formats) {
            const th = document.createElement("th");
            th.innerText = format;
            headerRow.appendChild(th);

            for (const output of outputs) {
                const row = tbody.insertRow();
                const cell = row.insertCell();
                const a = document.createElement("a");
                a.innerText = output.toUpperCase();
                a.dataset.format = format;
                a.dataset.output = output;
                cell.appendChild(a);
                a.addEventListener("click", handleLinkClick);
            }
        }

        this.shadowRoot?.appendChild(frag);
    }

    //#region samples
    // connectedCallback() {
    //     console.log('Custom square element added to page.');
    //     updateStyle(this);
    // }

    // disconnectedCallback() {
    //     console.log('Custom square element removed from page.');
    // }

    // adoptedCallback() {
    //     console.log('Custom square element moved to new page.');
    // }
    //#endregion

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // console.log('Custom square element attributes changed.');
        // updateStyle(this);
    }
}

window.customElements.define("metadata-links-list", MetadataLinksList, { extends: "table" });