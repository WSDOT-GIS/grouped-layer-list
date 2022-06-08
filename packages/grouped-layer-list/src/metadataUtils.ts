import {
  detectLayerMetadataSupport,
  getMetadataLinks
} from "@wsdot/layer-metadata-soe-client";
import LayerList from "esri/dijit/LayerList";
import Layer from "esri/layers/layer";
import { IMapServiceLayersInfo } from "./IMapServiceLayersInfo";
import { LayerListOperationalLayer } from "./main";

const defaultFormatterPage = "https://wsdot-gis.github.io/geospatial-metadata";

/**
 * Creates a URL for a page that formats a metadata URL's XML into HTML.
 * @param metadataUrl Metadata URL.
 * @param formatterPageUrl Formatter page URL.
 */
function wrapUrlWithFormatterPage(
  metadataUrl: string,
  formatterPageUrl = defaultFormatterPage
) {
  if (!formatterPageUrl) {
    return metadataUrl;
  }
  const xmlUrl = metadataUrl + "?f=xml";
  const formatterSearch = `url=${encodeURIComponent(xmlUrl)}`;
  const outUrl = `${formatterPageUrl}?${formatterSearch}`;
  return outUrl;
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
  formatterPageUrl = defaultFormatterPage
) {
  layerList.on("load", ({ target }) => {
    // Get the DOM node of the layer list
    const node = (target as unknown) as HTMLElement;

    // Get the checkboxes for each layer.
    const checkboxes = node.querySelectorAll<HTMLInputElement>(
      ".esriTitleContainer > input[type=checkbox]"
    );

    function setupMetadataTab(checkbox: HTMLInputElement) {
      if (!checkbox.dataset.layerIndex) {
        return;
      }
      const layerIndex = parseInt(checkbox.dataset.layerIndex!, 10);
      const opLayer = layerList.layers[
        layerIndex!
      ] as LayerListOperationalLayer;
      let tabContainer: Element | undefined;
      try {
        tabContainer = getTabContainerFromCheckbox(checkbox);
      } catch (err) {
        // If its one of the sublayer checkboxes, a TypeError
        // with be thrown.
        // TODO: modify the querySelectorAll statement to be
        // more specific so that only the parent level checkboxes
        // are returned.
        if (!(err instanceof TypeError)) {
          throw err;
        }
      }
      if (tabContainer) {
        addMetadataTab(tabContainer, opLayer, layerIndex!, formatterPageUrl);
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
 * @returns True if built-in metadata is supported. False to fallback on SOE if available.
 */
async function getBuiltInMetadataUrls(layer: LayerListOperationalLayer) {
  console.group("Begin getBuiltInMetadataUrls");
  console.debug("layer", layer);
  // Exit if layer URL is underfined.
  let layerUrl = layer.layer?.url;
  if (!layerUrl) {
    console.groupEnd();
    return null;
  }

  console.debug("layerUrl", layerUrl);

  const serviceRootRe = /(?:(?:Map)|(?:Feature))Server(\/?)$/g;
  const serviceRootMatch = layerUrl.match(serviceRootRe);

  console.debug("serviceRootMatch", serviceRootMatch)

  if (!serviceRootMatch) {
    // Exit if not a supported URL type.
    console.groupEnd();
    return null;
  } else if (!serviceRootMatch[1]) {
    // Append trailing slash to URL if not present.
    console.debug(`Appending trailing slash to ${layerUrl}`);
    layerUrl += "/"
  }


  const metadataUrl = `${layerUrl}info/metadata`;
  const layersUrl = `${layerUrl}layers?f=json`;

  console.debug("urls", {
    layerUrl,
    metadataUrl,
    layersUrl
  });

  const response = await fetch(layersUrl);
  const layerInfo: IMapServiceLayersInfo = await response.json();

  console.debug("layer info response", layerInfo);

  let mdLinks: {[key: string]: string} = {
    [`${layer.title || "Service"}`]: metadataUrl
  }


  const metadataUrls: Array<[string, string]> = layerInfo.layers.filter(l => l.hasMetadata).map(l => [l.name, `${layerUrl}${l.id}/metadata/`]);
  
  for (const [name, url] of metadataUrls) {
    mdLinks[name] = url
  }

  console.debug("metadata urls", metadataUrls);

  return mdLinks;
}

/**
 * Adds the metadata tab to a layer's tab container after checking to see
 * if the layer in question supports the LayerMetadata SOE.
 * @param tabContainer
 * @param operationalLayer
 * @param layerIndex
 * @param formatterPageUrl
 */
async function addMetadataTab(
  tabContainer: Element,
  operationalLayer: LayerListOperationalLayer,
  layerIndex: number,
  formatterPageUrl: string
) {
  // Exit early if there is no layer URL.
  if (
    !(operationalLayer?.layer?.url)
  ) {
    return;
  }

  let mdLinks = await getBuiltInMetadataUrls(operationalLayer);


  if (!mdLinks) {
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
      a.href = wrapUrlWithFormatterPage(mdUrl, formatterPageUrl);
      a.appendChild(createFCNameSpans(name));
      const li = document.createElement("li");
      li.appendChild(a);
      ul.appendChild(li);
    }
  }
  tab.appendChild(ul);
}
