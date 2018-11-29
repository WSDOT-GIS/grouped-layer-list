import { LayerListOperationalLayer } from "@wsdot/grouped-layer-list";
import LayerList from "esri/dijit/LayerList";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import { LayerSettings } from "./LayerSettings";

/**
 * Updates the layers' settings to match those from URL search parameters.
 * @param search URL search string
 * @param opLayers Operational layers
 */
export function setOperationalLayers(
  search: URLSearchParams,
  layerList: LayerList
) {
  if (!search || !window.URLSearchParams) {
    return;
  }

  const opLayers = layerList.layers as LayerListOperationalLayer[];

  for (const opLayer of opLayers) {
    // Skip if layer has no corresponding entry in URLSearchParams.
    if (!opLayer.id || !search.has(opLayer.id)) {
      continue;
    }

    const val = search.get(opLayer.id);
    if (!val) {
      // Skip if there is no value. (E.g., value is empty string.)
      continue;
    }

    // parse string value into layer settings object.
    const layerSettings = LayerSettings.parse(val);
    if (!layerSettings) {
      // tslint:disable-next-line:no-console
      console.warn(
        `could not parse "${val}" into layer settings for layer ${opLayer.id}.`
      );
      continue;
    }

    layerSettings.apply(opLayer);
  }
}

/**
 * Creates a link on the map that will, when clicked, copy the URL of the page with
 * URL search parameters
 * @param layerList
 */
export function createLayerLink(layerList: LayerList) {
  const urlSupported = window.URL && window.URLSearchParams && window.history;
  if (!urlSupported) {
    throw new Error(
      "Browser must support all of the following features: URL, URLSearchParams, history."
    );
  }

  const div = document.createElement("div");
  div.classList.add("layer-link");

  const a = document.createElement("a");
  a.href = new URL(
    location.href,
    location.href.replace(/\?.+$/, "")
  ).toString();
  a.textContent = "📋";
  a.title = "copy URL with layer settings to clipboard";
  a.target = "_blank";
  a.classList.add("layer-link__anchor");

  const copiedClass = "layer-link-copied";
  const disabledClass = "layer-link-disabled";

  div.classList.add(disabledClass);

  div.appendChild(a);

  layerList.on("toggle", function(this: HTMLDivElement, toggleEvent) {
    div.classList.remove(copiedClass);
    div.classList.remove(disabledClass);
    const { layerIndex, visible, subLayerIndex } = toggleEvent;
    const operationalLayer = layerList.layers[
      layerIndex
    ] as LayerListOperationalLayer;
    const url = new URL(a.href);

    const layerSettings = new LayerSettings(operationalLayer.layer);
    url.searchParams.set(operationalLayer.id!, layerSettings.toString());
    a.href = url.toString();
  });

  // Setup link click event. When link is clicked
  a.onclick = function(this, e) {
    const unsupportedMessage =
      "Could not copy to clipboard. Right-click link and use context menu to copy link.";

    const clipboard: any = (navigator as any).clipboard;
    // If browser doesn't support clipboard, show an alert.
    if (!(clipboard && clipboard.writeText)) {
      alert(unsupportedMessage);
      return false;
    }
    // Copy link's href value to clipboard.
    // If successful, add a class for CSS to style to indicate success.
    // If copy fails, show an alert.
    clipboard.writeText(a.href).then(
      () => {
        div.classList.add(copiedClass);
      },
      (clipErr: Error) => {
        alert(unsupportedMessage);
      }
    );
    return false;
  };

  const mapRoot = layerList.map.root as HTMLElement;

  mapRoot.appendChild(div);
}
