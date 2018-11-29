import { LayerListOperationalLayer } from "@wsdot/grouped-layer-list";
import LayerList from "esri/dijit/LayerList";
import Extent from "esri/geometry/Extent";
import webMercatorUtils from "esri/geometry/webMercatorUtils";
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

  layerList.map.on("extent-change", ({ extent }) => {
    extent = webMercatorUtils.webMercatorToGeographic(extent) as Extent;
    const { xmin, ymin, xmax, ymax } = extent;
    const searchValue = [xmin, ymin, xmax, ymax]
      .map(n => {
        return Math.round(n * 10000) / 10000;
      })
      .join(" ");
    const url = new URL(a.href);
    url.searchParams.set("map-extent", searchValue);
    a.href = url.toString();
    div.classList.remove(disabledClass);
  });

  layerList.on("toggle", function(this: HTMLDivElement, toggleEvent) {
    // Enable and turn off copied status.
    div.classList.remove(copiedClass);
    div.classList.remove(disabledClass);
    const { layerIndex, visible, subLayerIndex } = toggleEvent;

    // Get the operational layer from the layer list based on the event's layerIndex.
    const operationalLayer = layerList.layers[
      layerIndex
    ] as LayerListOperationalLayer;

    // Get the URL currently in the link's href attribute.
    // Store in URL object so that search params can be
    // easily searched and manipulated.
    const url = new URL(a.href);

    // Retrieve the current settings store in the URL for this layer.
    // If there are no settings, the old settings variable will be null.
    const oldSettingStr = url.searchParams.get(operationalLayer.id!);
    const oldSettings = oldSettingStr
      ? LayerSettings.parse(oldSettingStr)
      : null;

    // Detect if the settings for this layer had sublayers specified.
    const hadSublayersDefined = oldSettings
      ? oldSettings.visibleLayers != null
      : false;

    // Initialize layer settings object.
    let layerSettings: LayerSettings;

    // Layer settings string for the URL will simply indicate if
    // the parent layer is on or off except under these conditions:
    // * Ability to change sublayer visibility is enabled for current layer.
    // * User changed visibility of sublayer via UI or sublayer visibility
    //   had been previously set in the URL.
    if (
      operationalLayer.showSubLayers &&
      (hadSublayersDefined || subLayerIndex != null)
    ) {
      layerSettings = new LayerSettings(operationalLayer.layer);
    } else {
      layerSettings = new LayerSettings({ visible });
    }

    // Update the URL search parameter for this layer and assign updated URL to link's href.
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
