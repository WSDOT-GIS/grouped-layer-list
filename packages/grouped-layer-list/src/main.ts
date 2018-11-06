import { LayerListOptions } from "esri";
import LayerList from "esri/dijit/LayerList";

export interface GroupedLayerListOptions extends LayerListOptions {
  groupHeaders: { [layerId: string]: string };
}

export default class GroupedLayerList extends LayerList {
  constructor(options: LayerListOptions, srcNode: string | Node) {
    super(options, srcNode);

    this.on("load", evt => {
      const rootNode =
        typeof srcNode === "string"
          ? document.getElementById(srcNode)!
          : (srcNode as HTMLElement);
      const listItems = rootNode.querySelectorAll(".esriList > li");
      console.log("list items", listItems);
    });
  }
}
