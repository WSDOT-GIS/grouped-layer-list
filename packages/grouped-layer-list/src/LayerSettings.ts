import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import { LayerListOperationalLayer } from "./main";
import { makeBooleanRe } from "./reUtils";

/**
 * interface common to an operational layer as well as LayerSettings.
 */
// tslint:disable-next-line:interface-name
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
    const trueRe = makeBooleanRe(true, false);
    const falseRe = makeBooleanRe(false, false);
    const sublayersRe = /\-?\d+/g; // matches all instances of integers in a string.

    let visible = trueRe.test(str)
      ? true
      : falseRe.test(str)
      ? false
      : undefined;
    let visibleLayers: number[] | undefined;
    const sublayersMatch = str.match(sublayersRe);
    if (sublayersMatch) {
      visibleLayers = sublayersMatch.map(s => parseInt(s, 10));
    }
    if (visible === undefined && visibleLayers) {
      visible = true;
    }

    if (visible === null) {
      return null;
    }

    const layerSettings = new LayerSettings({
      visible,
      visibleLayers
    });

    return layerSettings;
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

    // TypeScript cast to more specific type to allow check for
    // suspend and resume functions.
    const refreshAbleLayer = layer as ArcGISDynamicMapServiceLayer;

    // Suspend drawing operations until all layer properties are set.
    if (refreshAbleLayer.suspend) {
      refreshAbleLayer.suspend();
    }

    if (this.visible != null) {
      operationalLayer.visibility = this.visible;
      layer.setVisibility(this.visible);
    }
    if (operationalLayer.showSubLayers !== false && this.visibleLayers) {
      refreshAbleLayer.setVisibleLayers(this.visibleLayers);
    }

    // Resume layer drawing.
    if (refreshAbleLayer.resume) {
      refreshAbleLayer.resume();
    }
  }
  /**
   * Converts to string for use with URLSearchParams
   */
  public toString() {
    const checked = "✓";
    const unchecked = "⍻";

    const checkedState =
      this.visible == null ? "" : this.visible ? checked : unchecked;

    // const visibleLayers = this.visibleLayers
    //   ? this.visibleLayers.join(" ")
    //   : "";

    // return visibleLayers ? `${checkedState} ${visibleLayers}`

    if (this.visibleLayers) {
      return [checkedState]
        .concat(this.visibleLayers.map(n => n.toString(10)))
        .join(" ");
    }
    return checkedState;
  }
}
