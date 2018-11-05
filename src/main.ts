import { LayerListOptions } from "esri";
import LayerList from "esri/dijit/LayerList";

export interface GroupedLayerListOptions extends LayerListOptions {
  groupHeaders: { [layerId: string]: string };
}

export class GroupedLayerList extends LayerList {
  constructor(options: LayerListOptions, srcNode: string | Node) {
    super(options, srcNode);
  }
}
