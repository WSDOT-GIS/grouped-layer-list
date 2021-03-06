import { Handle } from "esri";
import LayerList from "esri/dijit/LayerList";
import Extent from "esri/geometry/Extent";
import webMercatorUtils from "esri/geometry/webMercatorUtils";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import { LayerSettings } from "./LayerSettings";
import { LayerListOperationalLayer } from "./main";

/**
 * Updates the layers' settings to match those from URL search parameters.
 * This function should be run on the operational layers **before** they are added
 * to a LayerList.
 * @param search URL search string
 * @param opLayers Operational layers
 */
export function setOperationalLayers(
  search: URLSearchParams,
  opLayers: LayerListOperationalLayer[]
) {
  if (!search || !window.URLSearchParams) {
    return;
  }

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
 * Result of a createLayerLink function.
 */
export interface CreateLayerLinkResult {
  /**
   * The event handler added to the map's "extent-change" event.
   */
  extentChangeHandle: Handle;
  /**
   * LayerList "toggle" event handle.
   */
  layerToggleHandle: Handle;
  /**
   * The HTML element that contains the control.
   */
  root: HTMLDivElement;
}

/**
 * Creates a link on the map that will, when clicked, copy the URL of the page with
 * URL search parameters.
 *
 * CSS classes of output elements:
 *
 *  class name           | description
 *  ------------------   | -----------
 * .layer-link           | this class will be applied to the div element that contains the link.
 * .layer-link--copied   | This class will be added to the div after the user has clicked the link and successfully updated the browsers URL via History API. Removed after user changes the state of the map and the URL is updated.
 * .layer-link--disabled | This class is applied initially to the div and is removed once the user has changed the map in a way that updates the link's URL.
 * .layer-link__anchor   | this class is applied to the anchor element.
 *
 * @param layerList A layer list control
 * @returns An object that contains the "root" HTML element control and the event handlers used to update the URL to match the map's state.
 */
export function createLayerLink(layerList: LayerList): CreateLayerLinkResult {
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
  a.textContent = "🔗";
  a.title = "Click to update URL with layer and extent paramters.";
  a.target = "_blank";
  a.classList.add("layer-link__anchor");

  const copiedClass = "layer-link--copied";
  const disabledClass = "layer-link--disabled";

  div.classList.add(disabledClass);

  div.appendChild(a);

  // Setup event to update the "map-extent" URL search parameter when the map's extent is changed.
  const extentChangeHandle = layerList.map.on("extent-change", ({ extent }) => {
    extent = webMercatorUtils.webMercatorToGeographic(extent) as Extent;
    // Get the coordinates of the new extent.
    const { xmin, ymin, xmax, ymax } = extent;
    // round to 4 dec. places and concatenate into space-separated string.
    const searchValue = [xmin, ymin, xmax, ymax]
      .map(n => {
        return Math.round(n * 10000) / 10000;
      })
      .join(" ");
    // Add or update the "map-extent" property with the coordinates string,
    // then set the anchor's href to this new URL.
    const url = new URL(a.href);
    url.searchParams.set("map-extent", searchValue);
    a.href = url.toString();
    // remove the disabled and copied classes to indicate to the user that the link href has been updated
    // since they last copied.
    div.classList.remove(disabledClass);
    div.classList.remove(copiedClass);
  });

  // Setup event handler to update URL when map layers are toggled on or off.
  const layerToggleHandle = layerList.on("toggle", function(
    this: HTMLDivElement,
    toggleEvent
  ) {
    console.group("LayerList toggle event");

    // Enable and turn off copied status.
    div.classList.remove(copiedClass);
    div.classList.remove(disabledClass);
    const { layerIndex, visible, subLayerIndex } = toggleEvent;
    console.debug(
      `layer: ${layerIndex}, sublayer ${subLayerIndex}, visible: ${visible}`
    );

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
      ? !!oldSettings.visibleLayers
      : false;

    const layerSettings = new LayerSettings({
      visible: operationalLayer.visibility,
      visibleLayers: (operationalLayer.layer as ArcGISDynamicMapServiceLayer)
        .visibleLayers
    });

    // Initialize layer settings object.
    // let layerSettings: LayerSettings;

    // Layer settings string for the URL will simply indicate if
    // the parent layer is on or off except under these conditions:
    // * Ability to change sublayer visibility is enabled for current layer.
    // * User changed visibility of sublayer via UI or sublayer visibility
    //   had been previously set in the URL.
    // if (
    //   operationalLayer.showSubLayers &&
    //   (hadSublayersDefined || subLayerIndex != null)
    // ) {
    //   layerSettings = new LayerSettings(operationalLayer.layer);
    // } else {
    //   layerSettings = new LayerSettings({ visible });
    // }

    // Update the URL search parameter for this layer and assign updated URL to link's href.
    url.searchParams.set(operationalLayer.id!, layerSettings.toString());
    a.href = url.toString();
  });

  // Setup link click event. When link is clicked, URL will be updated.
  a.onclick = function(this, e) {
    if (window.history) {
      history.replaceState(undefined, document.title, a.href);
      div.classList.add(copiedClass);
      return false;
    }
  };

  const mapRoot = layerList.map.root as HTMLElement;

  mapRoot.appendChild(div);

  return { layerToggleHandle, extentChangeHandle, root: div };
}
