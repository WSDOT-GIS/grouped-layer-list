import {
  ArcGISDynamicMapServiceLayerOptions,
  ArcGISTiledMapServiceLayerOptions
} from "esri";

import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import ArcGISTiledMapServiceLayer from "esri/layers/ArcGISTiledMapServiceLayer";
import { LayerListOperationalLayer, LayerPropGroups } from "./main";

/**
 * A layer as defined by the GeoPortal application.
 */
export interface ConfigLayer {
  layerType: string;
  url: string;
  options:
    | ArcGISDynamicMapServiceLayerOptions
    | ArcGISTiledMapServiceLayerOptions;
}

/**
 * The value of each property of this object is an array of layer definitions.
 */
export interface ConfigLayerGroups {
  [groupName: string]: ConfigLayer[];
}

/**
 * Creates an operational layer from a GeoPortal config file layer definition.
 * @param configLayer GeoPortal config file layer definition
 * @returns a LayerList operational layer.
 */
function configLayerToOpLayer(configLayer: ConfigLayer) {
  const { layerType, url } = configLayer;
  const title = configLayer.options.id!;
  // Replace non-alphanumeric characters with underscore.
  const id = title.replace(/[^a-z0-9]+/gi, "_");
  const visible = configLayer.options.visible || false;
  // Create layer object matching layerType string.
  const layer = /Tiled/i.test(layerType)
    ? new ArcGISTiledMapServiceLayer(url, { id, visible })
    : new ArcGISDynamicMapServiceLayer(url, { id, visible });

  const opLayer: LayerListOperationalLayer = {
    id,
    layer,
    showLegend: true,
    showOpacitySlider: true,
    title,
    visibility: visible
  };
  return opLayer;
}

/**
 * Creates operational layers and group definition from GeoPortal config "layers" section.
 * @param configLayers "layers" value from GeoPortal config.
 */
export function fromGeoportalLayers(configLayers: ConfigLayerGroups) {
  const layers = new Array<LayerListOperationalLayer>();
  const groups: LayerPropGroups = {};

  for (const groupName in configLayers) {
    if (configLayers.hasOwnProperty(groupName)) {
      const layersOfGroup = configLayers[groupName];
      const opLayers = layersOfGroup.map(configLayerToOpLayer);
      opLayers.forEach(l => layers.push(l));
      groups[groupName] = opLayers.map(ol => ol.title!);
    }
  }

  return { groups, layers };
}
