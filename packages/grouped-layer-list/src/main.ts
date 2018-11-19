import { LayerListOptions } from "esri";
import LayerList from "esri/dijit/LayerList";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import Layer from "esri/layers/layer";
import EsriMap from "esri/map";
import { addMetadataTabs } from "./metadataUtils";

export { addMetadataTabs };

export interface OperationalLayerCommon {
  id?: string;
  /** Optional 	The title of the layer. */
  title?: string;
  /** Optional 	Indicates whether to set the default visibility. */
  visibility?: boolean;
}

/**
 * Operational layer property from the returned object of a createMap operation.
 */
export interface CreateMapOperationalLayer extends OperationalLayerCommon {
  [key: string]: any;
  /** A collection of errors that were encountered when adding the layer to the map. */
  errors: Error[];
  /** "esri/layers/layer" object. */
  layerObject: Layer;
  /** The type of layer. */
  layerType: string;
  /** Resource information */
  resourceInfo: any;
  /** layer URL */
  url: string;
}

/**
 * Defines a map layer for a layer list.
 */
export interface LayerListOperationalLayer extends OperationalLayerCommon {
  /** Optional 	Custom button node that will appear within the layer title. */
  button?: Node | string;
  /** Optional 	Custom node to insert the content. It displays below the title. */
  content?: Node | string;
  /** Required 	Layer's feature collection. This is required if a layer is not specified. */
  featureCollection?: Layer;
  /** Optional 	The layers id. */
  id?: string;
  /** Required 	The layer object. This is required unless using a feature collection. */
  layer?: Layer;
  /** Optional 	Indicates whether to display a legend for the layer items. */
  showLegend?: boolean;
  /** Optional 	Indicates whether to display the opacity slider. */
  showOpacitySlider?: boolean;
  /** Optional 	Indicates whether to show sublayers for this layer. Prior to version 3.15, this was named sublayers. */
  showSubLayers?: boolean;
}

export interface CreateMapEvent {
  clickEventHandle: any;
  clickEventListener: (...args: any[]) => any;
  errors: Error[];
  itemInfo: {
    item: any;
    itemData: {
      [key: string]: any;
      operationalLayers: CreateMapOperationalLayer[];
    };
  };
  map: EsriMap;
}

export interface LayerGroups {
  [groupName: string]: Layer[];
}

/**
 * Layer groups represented by arrays of layer properties (E.g., arrays of layer "id" values.)
 */
export interface LayerPropGroups {
  [groupName: string]: string[];
}

export interface GroupedLayerListOptions extends LayerListOptions {
  groups: LayerPropGroups;
  groupProperty: "id" | "title";
  throwOnGroupNotFound?: boolean;
  metadata?: boolean;
  metadataFormatterPage?: string | null;
}

/**
 * Converts the operational layer format returned from arcgis/utils.createMap to the
 * operation layer format expected by the LayerList constructor.
 * @param opLayer
 */
export function convertLayer(
  opLayer: CreateMapOperationalLayer
): LayerListOperationalLayer {
  const { id, title, visibility } = opLayer;
  const showLegend = true;
  const showOpacitySlider = true;
  const layer = opLayer.layerObject;
  // Don't show sublayers tab if there is only one sublayer. Otherwise, show it.
  const showSubLayers = (layer as any).layerInfos
    ? (layer as ArcGISDynamicMapServiceLayer).layerInfos.length > 1
    : true;
  return {
    id,
    title,
    layer,
    visibility,
    showLegend,
    showOpacitySlider,
    showSubLayers
  };
}

/**
 * Enumerate through the layers in the order presented in the grouping object.
 * @param titleGroups Grouping of layers
 * @param layers Array of layers
 * @param propertyName The name of the property. (Defaults to "id")
 * @param throwOnValueNotFound Set to true to throw a ReferenceError if a
 * group has a value that has no matching layer. If set to false, the invalid
 * value will simply be ignored.
 * @throws ReferenceError thrown if titleGroups contains a value that has no
 * corresponding layer when throwOnValueNotFound is true.
 */
function* enumerateLayersInGroupOrder(
  titleGroups: LayerPropGroups,
  layers: LayerListOperationalLayer[],
  propertyName: string = "id",
  throwOnValueNotFound?: boolean
) {
  for (const groupName in titleGroups) {
    if (titleGroups.hasOwnProperty(groupName)) {
      const titles = titleGroups[groupName];
      for (const title of titles) {
        const layer = layers.find(l => (l as any)[propertyName] === title);
        if (!layer) {
          const msg = `No layer found with "${propertyName}" of "${title}".`;
          if (throwOnValueNotFound) {
            throw new ReferenceError(msg);
          } else {
            console.warn(msg);
            continue;
          }
        }
        yield layer;
      }
    }
  }
}

/**
 * Creates a mapping of layer titles to groups.
 * @param groups
 */
function createTitleToGroupMapping(groups: LayerPropGroups) {
  const mapping = new Map<string, string>();
  for (const groupName in groups) {
    if (groups.hasOwnProperty(groupName)) {
      const layerNames = groups[groupName];
      layerNames.forEach(ln => mapping.set(ln, groupName));
    }
  }
  return mapping;
}

/**
 * Adds group headings above the list item corresponding to the first layer
 * in a group.
 * @param srcNode the srcNode of a LayerList
 * @param groups Defines which layers are in which group.
 * @returns CSS text to be added to a <style> element to be added to the page <head>.
 */
function addGroupHeadings(srcNode: Node | string, groups: LayerPropGroups) {
  // srcNode can be defined as either a node's "id" or the node itself.
  // Get the HTMLElement.
  const rootNode =
    typeof srcNode === "string"
      ? document.getElementById(srcNode)!
      : (srcNode as HTMLElement);
  // Get all of the <li> elements that correspond to map layers.
  const listItems = rootNode.querySelectorAll(".esriList > li");
  // Create layer title-to-group mapping.
  const mapping = createTitleToGroupMapping(groups);
  // Initialize variable to hold previous group name from previous loop iteration.
  let previousGroupName: string | undefined;

  // Define a common css class for all list items that begin a group.
  const groupStartClass = "layer-list-group-start";
  // Initialize group counter
  let groupNo: number = 0;

  // Initialize CSS class name to group name mapping.
  const classToGroupNameMapping = new Map<string, string>();

  // Assign CSS classes to the <li>s corresponding to the first layer in a group.
  // For each such item, add item to the class-to-group mapping.
  listItems.forEach(li => {
    const label = li.querySelector("label");
    if (label) {
      const title = label.textContent!;
      const groupName = mapping.get(title);
      if (groupName !== previousGroupName) {
        const className = `layer-list-group-${groupNo}`;
        classToGroupNameMapping.set(className, groupName!);
        li.classList.add(groupStartClass, className);
        groupNo++;
      }
      previousGroupName = groupName;
    }
  });

  // Create the CSS definition.
  const cssText = Array.from(
    classToGroupNameMapping,
    ([className, groupName]) =>
      `.${className}:before { content: '${groupName}' }`
  );

  return cssText.join("\n");
}

/**
 * An extension of esri/dijit/LayerList that supports grouping.
 */
export default class GroupedLayerList extends LayerList {
  constructor(options: GroupedLayerListOptions, srcNode: string | Node) {
    // Change the layers' order to match the group object.
    options.layers = Array(
      ...enumerateLayersInGroupOrder(
        options.groups,
        options.layers,
        options.groupProperty,
        options.throwOnGroupNotFound
      )
    ).reverse();
    super(options, srcNode);

    this.on("load", evt => {
      // Add group headers to the first layer's <li> using CSS :before pseudo-element.
      const cssText = addGroupHeadings(srcNode, options.groups);
      const styleNode = document.createElement("style");
      styleNode.textContent = cssText;
      document.head!.appendChild(styleNode);
    });

    if (options.metadata) {
      addMetadataTabs(this, options.metadataFormatterPage || undefined);
    }
  }
}
