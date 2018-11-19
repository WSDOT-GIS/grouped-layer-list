import {
  detectLayerMetadataSupport,
  getMetadataLinks
} from "@wsdot/layer-metadata-soe-client";
import LayerList from "esri/dijit/LayerList";
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

    // Setup an event to occur the first time layer's checkbox is clicked.
    checkboxes.forEach(cb => {
      cb.addEventListener(
        "click",
        function(this, ev) {
          // "this" is the checkbox that was clicked.
          if (!this.dataset.layerIndex) {
            return;
          }
          const layerIndex = parseInt(this.dataset.layerIndex!, 10);
          const opLayer = layerList.layers[layerIndex!];
          const tabContainer = getTabContainerFromCheckbox(this);
          addMetadataTab(tabContainer, opLayer, layerIndex!, formatterPageUrl);
        },
        {
          once: true,
          passive: true
        }
      );
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
    !(operationalLayer && operationalLayer.layer && operationalLayer.layer.url)
  ) {
    return;
  }

  const tabList = tabContainer.firstElementChild! as HTMLUListElement;
  const tabs = tabContainer.children[1] as HTMLDivElement;
  const url = operationalLayer.layer.url;

  const metadataSupported = await detectLayerMetadataSupport(url);
  if (!metadataSupported) {
    return;
  }

  const mdLinks = await getMetadataLinks(url);

  const tabId = "metadata";

  const listItem = document.createElement("li");
  listItem.tabIndex = 0;
  listItem.dataset.tabId = tabId;
  listItem.dataset.layerIndex = layerIndex.toString(10);
  listItem.setAttribute("role", "tab");
  listItem.classList.add("esriTabMenuItem");
  listItem.textContent = "Metadata";

  const tab = document.createElement("div");
  tab.classList.add("esriTab", "metadata-panel");
  tab.setAttribute("role", "tabpanel");
  tab.dataset.tabId = tabId;

  tabList.appendChild(listItem);
  tabs.appendChild(tab);

  const ul = document.createElement("ul");
  ul.classList.add("layer-metadata-list");
  for (const name in mdLinks) {
    if (mdLinks.hasOwnProperty(name)) {
      const mdUrl = mdLinks[name];
      const a = document.createElement("a");
      a.target = "wsdot-metadata";
      a.href = wrapUrlWithFormatterPage(mdUrl, formatterPageUrl);
      a.textContent = name;
      const li = document.createElement("li");
      li.appendChild(a);
      ul.appendChild(li);
    }
  }
  tab.appendChild(ul);
}
