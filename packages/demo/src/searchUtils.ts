import { LayerListOperationalLayer } from "@wsdot/grouped-layer-list";
import LayerList from "esri/dijit/LayerList";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";

export interface ILayerSettings {
  visible?: boolean;
  visibleLayers?: number[];
  opacity?: number;
}

/**
 * Stores settings for individual layers.
 */
export class LayerSettings implements ILayerSettings {
  /**
   * Converts a string from a URLSearchParams value into a LayerSettings.
   * @param str a value from a URLSearchParams.
   */
  public static parse(str: string): LayerSettings | null {
    const re = /^((?:true)|(?:false))(?:;([\d,]+))?(?:;(\d+(?:\.\d+)?)%)?/;
    const match = str.match(re);
    if (!match) {
      return null;
    }

    const [, visibleStr, visibleLayersStr, opacityStr] = match;
    const visible = /(true)/i.test(visibleStr);
    const visibleLayers = visibleLayersStr
      ? visibleLayersStr.split(",").map(s => parseInt(s, 10))
      : undefined;
    const opacity = opacityStr ? parseFloat(opacityStr) / 100 : undefined;
    return new LayerSettings({
      visible,
      visibleLayers,
      opacity
    });
  }
  /** is the layer visible */
  public visible?: boolean;
  /** which sublayers are turned on */
  public visibleLayers?: number[];
  // tslint:disable-next-line:variable-name
  public opacity?: number;

  /**
   * Creates a new instance
   * @param options An object that implements ILayerSettings.
   */
  constructor(options?: ILayerSettings) {
    if (options) {
      this.visible = options.visible;
      this.visibleLayers = options.visibleLayers;
      this.opacity =
        typeof options.opacity === "number" ? options.opacity : undefined;
    }
  }
  /**
   * Converts to string for use with URLSearchParams
   */
  public toString() {
    const output = [];
    if (this.visible == null) {
      return "";
    }
    output.push(`${this.visible}`);
    if (this.visibleLayers) {
      output.push(this.visibleLayers.join(","));
    }
    if (this.opacity != null) {
      output.push(`${this.opacity * 100}%`);
    }
    return output.join(";");
  }
}

/**
 * Creates a URLSearchParams object listing which layers are visible.
 * @param layerList A LayerList.
 * @returns Returns a URLSearchParams listing visible layers, or null if browser does not support URLSearchParams.
 */
export function getUrlSearch(layerList: LayerList) {
  if (!window.URLSearchParams) {
    return null;
  }
  const opLayers = layerList.layers as LayerListOperationalLayer[];
  const params = new URLSearchParams();
  for (const opLayer of opLayers) {
    // Skip of operational layer has no layer property.
    if (!opLayer.layer) {
      continue;
    }
    const { layer } = opLayer;
    const dynLayer = layer as ArcGISDynamicMapServiceLayer;
    const name = layer.id;
    // If the map layer is configured to allow users to toggle
    // sublayers, the value will be a space separated list of
    // sublayer ID integers.
    // Otherwise the value will be a boolean indicating if the layer
    // is on or off.
    const value =
      layer.visible && dynLayer.visibleLayers && opLayer.showSubLayers
        ? dynLayer.visibleLayers.join(" ")
        : `${layer.visible}`;
    params.append(name, value);
  }
  return params;
}

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

    const { layer } = opLayer;

    if (!layer) {
      continue;
    }

    const refreshAbleLayer = layer as ArcGISDynamicMapServiceLayer;

    if (refreshAbleLayer.suspend) {
      refreshAbleLayer.suspend();
    }

    if (layerSettings.visible != null) {
      opLayer.visibility = layerSettings.visible;
      layer.setVisibility(layerSettings.visible);
    }
    if (opLayer.showSubLayers && layerSettings.visibleLayers) {
      (layer as ArcGISDynamicMapServiceLayer).setVisibleLayers(
        layerSettings.visibleLayers
      );
    }
    if (opLayer.showOpacitySlider && layerSettings.opacity != null) {
      layer.setOpacity(layerSettings.opacity);
    }

    if (refreshAbleLayer.resume) {
      refreshAbleLayer.resume();
    }
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
    const url = new URL(location.href, location.href.replace(/\?.+$/, ""));

    const layerSettings = new LayerSettings(operationalLayer.layer);
    url.searchParams.set(operationalLayer.id!, layerSettings.toString());
    a.href = url.toString();
  });

  // TODO: setup event handling for opacity slider.
  // * For each operational layer...
  //    * find opacity slider widget
  //    * setup event handler on widget that updates layer opacity URL setting

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
