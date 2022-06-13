import {
  detectLayerMetadataSupport,
  getMetadataLinks
} from "@wsdot/layer-metadata-soe-client";
import LayerList from "esri/dijit/LayerList";
import { IMapServiceLayersInfo } from "./IMapServiceLayersInfo";
import { LayerListOperationalLayer } from "./main";
import { MetadataFormat, MetadataOutput } from "./types";

export const defaultFormatterPage = "https://wsdot-gis.github.io/geospatial-metadata";

export enum MetadataSourceEnum {
  None = 0,
  BuiltIn = 1,
  Soe = 2,
  Both = 3 // BuiltIn | Soe
}
export interface IMetadataOptions {
  format?: MetadataFormat;
  output?: MetadataOutput;
  formatterPageUrl?: string;
  whatToFormat?: MetadataSourceEnum
}

/**
 * Detects if a metadata URL is a WSDOT custom LayerMetadata SOE URL.
 * @param url metadata URL
 * @returns Returns true if URL contains "exts/LayerMetadata", false otherwise.
 */
export function isSoeMetadataUrl(url: string | URL): boolean {
  const re = /\bexts\/LayerMetadata\b/gi;
  return re.test(url instanceof URL ? url.href : url);
}

/**
 * Creates a URL for a page that formats a metadata URL's XML into HTML.
 * @param metadataUrl Metadata URL.
 * @param options Controls how the metadata will be formatted.
 * @returns output URL
 */
function wrapUrlWithFormatterPage(
  metadataUrl: string | URL,
  options: IMetadataOptions
) {
  let { formatterPageUrl, format, output, whatToFormat } = options;
  const isSoe = isSoeMetadataUrl(metadataUrl);

  if (!(metadataUrl instanceof URL)) {
    metadataUrl = new URL(metadataUrl);
  }

  function shouldWrap(): boolean {

    if (!formatterPageUrl) {

      console.groupEnd();
      return false;
    }

    // Set whatToFormat to None if undefined.
    if (whatToFormat == null) {

      whatToFormat = MetadataSourceEnum.None;
    }

    let shouldWrap: boolean;

    if (isSoe) {
      shouldWrap = (whatToFormat & MetadataSourceEnum.Soe) === MetadataSourceEnum.Soe;;
      console.debug(`Current URL is an SOE. Should wrap? ${shouldWrap}`)
    } else {
      shouldWrap = (whatToFormat & MetadataSourceEnum.BuiltIn) === MetadataSourceEnum.BuiltIn;

    }
    console.groupEnd();
    return shouldWrap;
  }


  let outUrl: URL;
  if (shouldWrap() && formatterPageUrl) {
    outUrl = new URL(formatterPageUrl);
    let paramUrl = new URL(metadataUrl);

    if (!isSoe) {
      // For the wrapper page, the output will need to be XML, so remove "output" parameter
      paramUrl.searchParams.delete("output");
      if (format) {
        paramUrl.searchParams.set("format", format);
      }
    } else {
      paramUrl.searchParams.set("f", "xml");
    }
    outUrl.searchParams.set("url", paramUrl.href);

  } else { // Unwrapped
    outUrl = new URL(metadataUrl);

    if (!isSoe) {
      console.debug("is not an SOE")
      if (output) {
        outUrl.searchParams.set("output", output);
      }
      if (format) {
        outUrl.searchParams.set("format", format);
      }
    } else if (output !== "html") {
      outUrl.searchParams.set("f", "xml");
    }
  }

  console.groupEnd();
  return outUrl;
}

export class MetadataOptions implements IMetadataOptions {
  format?: MetadataFormat;
  output?: MetadataOutput;
  formatterPageUrl?: string;
  whatToFormat?: MetadataSourceEnum;

  /**
   * Creates a new instance
   * @param options options
   */
  constructor({ format, output, formatterPageUrl, whatToFormat }: IMetadataOptions) {
    this.format = format || "fgdc";
    this.output = output || "html";
    this.formatterPageUrl = formatterPageUrl || defaultFormatterPage;
    this.whatToFormat = whatToFormat || MetadataSourceEnum.Soe;
  }

  public wrapMetadataUrl(url: string | URL) {
    return wrapUrlWithFormatterPage(url, this);
  }
}

/**
 * Adds a "load" event handler to a layer list. When the layer list has loaded,
 * A metadata tab will be added to each layers list item after its checkbox is
 * clicked for the first time.
 *
 * **Must be called before LayerList.startup()!**
 * @param layerList Layer List dijit
 * @param formatterPageUrl URL of formatter page.
 */
export function addMetadataTabs(
  layerList: LayerList,
  options: IMetadataOptions = {
    format: "fgdc",
    output: "html",
    formatterPageUrl: defaultFormatterPage,
    whatToFormat: MetadataSourceEnum.Soe
  }
) {
  layerList.on("load", ({ target }) => {
    // Get the DOM node of the layer list
    const node = (target as unknown) as HTMLElement;

    // Get the checkboxes for each layer.
    const checkboxes = node.querySelectorAll<HTMLInputElement>(
      ".esriTitleContainer > input[type=checkbox]:not([data-sublayer-index])"
    );

    function setupMetadataTab(checkbox: HTMLInputElement) {
      if (!checkbox.dataset.layerIndex) {
        return;
      }
      const layerIndex = parseInt(checkbox.dataset.layerIndex!, 10);
      const opLayer = layerList.layers[layerIndex] as LayerListOperationalLayer;
      let tabContainer: Element | undefined;
      try {
        tabContainer = getTabContainerFromCheckbox(checkbox);
      } catch (err) {
        // If its one of the sublayer checkboxes, a TypeError
        // with be thrown.
        if (!(err instanceof TypeError)) {
          throw err;
        }
      }
      if (tabContainer) {
        addMetadataTab(tabContainer, opLayer, layerIndex, options);
      }
    }

    // Setup an event to occur the first time layer's checkbox is clicked.
    Array.from(checkboxes, cb => {
      if (cb.checked) {
        setupMetadataTab(cb);
      } else {
        cb.addEventListener(
          "click",
          function (this, ev) {
            // "this" is the checkbox that was clicked.
            setupMetadataTab(this);
          },
          {
            once: true,
            passive: true
          }
        );
      }
    });
  });
}

/**
 * Gets the tab container for the layer corresponding to the given checkbox
 * @param checkbox A checkbox input element.
 */
function getTabContainerFromCheckbox(checkbox: HTMLInputElement) {
  const tabContainer = checkbox.parentElement!.parentElement!
    .nextElementSibling!;
  return tabContainer;
}

/**
 * Parses a metadata source name into its component parts: database, schema, and table,
 * returning a document fragment with a corresponding span element for each.
 * @param dataSourceName The name of a metadata source.
 * @returns Returns a DocumentFragment containing span elements corresponding to database,
 * schema, and table parts of the metadata source name. If name can't be parsed, a
 * Text node with the input string is instead returned.
 */
function createFCNameSpans(dataSourceName: string) {
  const nameRe = /^([^\.]+)\.([^\.]+)\.([^\.]+)$/i;
  const match = dataSourceName.match(nameRe);
  if (match) {
    // Get the parts of the table name.
    const [, db, schema, table] = match;
    const dbSpan = document.createElement("span");
    const schemaSpan = document.createElement("span");
    const tableSpan = document.createElement("span");
    dbSpan.textContent = db;
    schemaSpan.textContent = schema;
    tableSpan.textContent = table;
    dbSpan.classList.add("metadata-source-name__db");
    schemaSpan.classList.add("metadata-source-name__schema");
    tableSpan.classList.add("metadata-source-name__table");
    const docFrag = document.createDocumentFragment();
    [dbSpan, schemaSpan, tableSpan].forEach(s => {
      docFrag.appendChild(s);
    });

    return docFrag;
  }
  return document.createTextNode(dataSourceName);
}

/**
 * Detects if the current layer supports metadata.
 * @param layer an operational layer
 * @param metadataOptions Specify the metadata output format.
 * @returns Returns an object which has properties named after layer names and these properties' values are the metadata URLs.
 */
async function getBuiltInMetadataUrls(layer: LayerListOperationalLayer, metadataOptions: IMetadataOptions): Promise<{ [key: string]: string; } | null> {
  // Exit if layer URL is underfined.
  let layerUrl = layer.layer?.url;
  if (!layerUrl) {
    return null;
  }
  const serviceRootRe = /(?:(?:Map)|(?:Feature))Server(\/?)$/g;
  const serviceRootMatch = layerUrl.match(serviceRootRe);

  const {format, output } = metadataOptions;

  if (!serviceRootMatch) {
    // Exit if not a supported URL type.
    return null;
  } else if (!serviceRootMatch[1]) {
    // Append trailing slash to URL if not present.
    layerUrl += "/"
  }

  function appendParameters(url: URL) {
    if (format) {
      url.searchParams.set("format", format);
    }
    if (output) {
      if (!format) {
        console.warn(`Metadata "output" parameter has been set to "${output}", but no value was given for the corresponding "format" parameter.`)
      }
      url.searchParams.set("output", output);
    }
  }


  const metadataUrl = new URL(`${layerUrl}info/metadata`);
  appendParameters(metadataUrl);
  const layersUrl = new URL(`${layerUrl}layers?f=json`);

  const response = await fetch(layersUrl);
  const layerInfo: IMapServiceLayersInfo = await response.json();

  let mdLinks: { [key: string]: string } = {
    [`${layer.title || "Service"}`]: metadataUrl.href
  }


  const metadataUrls: Array<[string, string]> = layerInfo.layers.filter(l => l.hasMetadata).map(l => {
    const url = new URL(`${layerUrl}${l.id}/metadata/`);
    appendParameters(url);
    return [l.name, url.href];
  });

  for (const [name, url] of metadataUrls) {
    mdLinks[name] = url
  }

  return mdLinks;
}

/**
 * Adds the metadata tab to a layer's tab container after checking to see
 * if the layer in question supports the LayerMetadata SOE.
 * @param tabContainer
 * @param operationalLayer
 * @param layerIndex
 * @param options
 */
async function addMetadataTab(
  tabContainer: Element,
  operationalLayer: LayerListOperationalLayer,
  layerIndex: number,
  options: IMetadataOptions
) {
  // Exit early if there is no layer URL.
  if (
    !(operationalLayer?.layer?.url)
  ) {
    return;
  }

  function* enumerateMetadataUrls(mdLinks: { [key: string]: string } | null) {
    if (!mdLinks) return;

    for (const key in mdLinks) {
      if (Object.prototype.hasOwnProperty.call(mdLinks, key)) {
        const url = mdLinks[key];
        yield [key, url] as [string, string];
      }
    }
  }

  const { format } = options;

  // Get metadata links using built-in functionality of ArcGIS Server if supported by the service.
  let mdLinks = await getBuiltInMetadataUrls(operationalLayer, options);

  // Create an array of the links so that we can count them.
  let mdLinkArray = [...enumerateMetadataUrls(mdLinks)];

  // Fall back to WSDOT custom SOE for metadata for older services without built-in metadata support.
  if (mdLinkArray.length <= 1) {
    const url = operationalLayer.layer.url;
    // Check to see if metadata SOE is supported by the operational layer's service.
    // If it is not supported, exit the function without adding the metadata tab.
    const soeMetadataSupported = await detectLayerMetadataSupport(url);
    if (!soeMetadataSupported) {
      return;
    }

    // Get metadata URLs.
    mdLinks = await getMetadataLinks(url);
  }

  // Create the list item that will act as the tab that the user clicks on
  const tabId = "metadata";
  const listItem = document.createElement("li");
  listItem.tabIndex = 0;
  listItem.dataset.tabId = tabId;
  listItem.dataset.layerIndex = layerIndex.toString(10);
  listItem.setAttribute("role", "tab");
  listItem.classList.add("esriTabMenuItem");
  listItem.textContent = "Metadata";

  // Create the tab content panel div element that will be shown when the user
  // clicks on the corresponding list item.
  const tab = document.createElement("div");
  tab.classList.add("esriTab", "metadata-panel");
  tab.setAttribute("role", "tabpanel");
  tab.dataset.tabId = tabId;

  // Append the tab and panel to appropriate parent elements.
  const tabList = tabContainer.firstElementChild! as HTMLUListElement;
  const tabs = tabContainer.children[1] as HTMLDivElement;
  tabList.appendChild(listItem);
  tabs.appendChild(tab);

  // Create the list of metadata links and add to tab panel.
  const ul = document.createElement("ul");
  ul.classList.add("layer-metadata-list");
  for (const name in mdLinks) {
    if (mdLinks.hasOwnProperty(name)) {
      const mdUrl = mdLinks[name];
      const a = document.createElement("a");
      a.target = "wsdot-metadata";
      a.href = wrapUrlWithFormatterPage(mdUrl, options).href;
      a.appendChild(createFCNameSpans(name));
      const li = document.createElement("li");
      li.appendChild(a);
      ul.appendChild(li);
    }
  }
  tab.appendChild(ul);
}
