import { LayerListOperationalLayer } from "@wsdot/grouped-layer-list";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";

/**
 * interface common to an operational layer as well as LayerSettings.
 */
export interface ILayerSettings {
  visible?: boolean;
  visibleLayers?: number[];
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
    const re = /^((?:true)|(?:false))(?:;([\d,]+))?/;
    const match = str.match(re);
    if (!match) {
      return null;
    }

    const [, visibleStr, visibleLayersStr] = match;
    const visible = /(true)/i.test(visibleStr);
    const visibleLayers = visibleLayersStr
      ? visibleLayersStr.split(",").map(s => parseInt(s, 10))
      : undefined;
    return new LayerSettings({
      visible,
      visibleLayers
    });
  }
  /** is the layer visible */
  public visible?: boolean;
  /** which sublayers are turned on */
  public visibleLayers?: number[];

  /**
   * Creates a new instance
   * @param options An object that implements ILayerSettings.
   */
  constructor(options?: ILayerSettings) {
    if (options) {
      this.visible = options.visible;
      this.visibleLayers = options.visibleLayers;
    }
  }
  /**
   * Applies the settings to an operational layer.
   * @param operationalLayer An operational layer from a layer list.
   */
  public apply(operationalLayer: LayerListOperationalLayer) {
    const { layer } = operationalLayer;

    if (!layer) {
      return;
    }

    const refreshAbleLayer = layer as ArcGISDynamicMapServiceLayer;

    if (refreshAbleLayer.suspend) {
      refreshAbleLayer.suspend();
    }

    if (this.visible != null) {
      operationalLayer.visibility = this.visible;
      layer.setVisibility(this.visible);
    }
    if (operationalLayer.showSubLayers && this.visibleLayers) {
      (layer as ArcGISDynamicMapServiceLayer).setVisibleLayers(
        this.visibleLayers
      );
    }

    if (refreshAbleLayer.resume) {
      refreshAbleLayer.resume();
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
    return output.join(";");
  }
}
