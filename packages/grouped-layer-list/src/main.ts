/**
 * Exposes GroupLayerList class and related functions.
 */

/**
 * @ignore import modules
 */
import { Handle, LayerListOptions } from "esri";
import LayerList from "esri/dijit/LayerList";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import Layer from "esri/layers/layer";
import EsriMap from "esri/map";
import { addMetadataTabs, MetadataFormat, MetadataOptions } from "./metadataUtils";

export * from "./searchUtils";
export * from "./conversionUtils";

/**
 * Properties that operational layers have in common.
 */
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

/**
 * Application properties section of an ArcGIS Online webmap.
 * @see https://developers.arcgis.com/web-map-specification/objects/applicationProperties/
 */
export interface ApplicationProperties {
  [key: string]: any;
  /** properties related to viewing (as opposed to editing, etc.) */
  viewing: {
    [key: string]: any;
    /**
     * layer grouping property created for use with the GroupedLayerList.
     * This is not part of Esri's standard
     */
    layerGrouping?: {
      enabled: boolean;
      groups: LayerPropGroups;
    };
  };
}

/**
 * Item data retrieved from ArcGIS Online (or other portal).
 */
export interface ItemInfo {
  /**
   * ArcGIS Online item
   * @see https://developers.arcgis.com/rest/users-groups-and-items/item.htm
   */
  item: any;
  /**
   * ArcGIS Online webmap
   * @see https://developers.arcgis.com/web-map-specification/
   */
  itemData: {
    [key: string]: any;
    applicationProperties?: ApplicationProperties;
    operationalLayers: CreateMapOperationalLayer[];
  };
}

/**
 * Gets layer group definition (if present) from a web map.
 * @param itemInfo
 */
export function getGroupsFromCreateMapItem(itemInfo: ItemInfo) {
  if (itemInfo.itemData.applicationProperties) {
    const { applicationProperties } = itemInfo.itemData;
    if (applicationProperties.viewing) {
      const { viewing } = applicationProperties;
      if (viewing.layerGrouping) {
        const { layerGrouping } = viewing;
        if (layerGrouping && layerGrouping.enabled && layerGrouping.groups) {
          return layerGrouping.groups;
        }
      }
    }
  }
  return null;
}

/**
 * @see https://developers.arcgis.com/javascript/3/jsapi/esri.arcgis.utils-amd.html#createmap
 */
export interface CreateMapEvent {
  clickEventHandle: Handle | undefined;
  clickEventListener: (...args: any[]) => any | undefined;
  errors: Error[];
  itemInfo: ItemInfo;
  map: EsriMap;
}

/**
 * Arrays of layers grouped by category names.
 */
export interface LayerGroups {
  [groupName: string]: Layer[];
}

/**
 * Layer groups represented by arrays of layer properties (E.g., arrays of layer "id" values.)
 */
export interface LayerPropGroups {
  [groupName: string]: string[];
}

/**
 * Options for the GroupedLayerList constructor
 */
export interface GroupedLayerListOptions extends LayerListOptions {
  /**
   * Defines how layers are grouped. Property names are group names.
   * Values correspond to either the title or id properties of operational layers.
   */
  groups?: LayerPropGroups;
  /**
   * Which property do the arrays in "groups" correspond to: "id" or "title"?
   */
  groupProperty?: "id" | "title";
  /**
   * Set to true if you want to throw an exception when a referenced group cannot be found.
   */
  throwOnGroupNotFound?: boolean;
  /**
   * Set to true to add the metadata tab to layers, false otherwise.
   */
  metadata?: boolean;
  /**
   * Specifies the metadata format.
   */
  metadataOptions?: MetadataOptions
}

/**
 * Converts the operational layer format returned from arcgis/utils.createMap to the
 * operation layer format expected by the LayerList constructor.
 * @param opLayer Operational layer object from arcgis/utils.createMap complete event.
 * @returns Operational layer for use with the LayerList constructor.
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
 * @yields {LayerListOperationalLayer}
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
 * Creates a mapping of layer titles to group names.
 * @param groups group definition object.
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
 * @returns CSS text to be added to a style element to be added to the page head.
 */
function addGroupHeadings(srcNode: Node | string, groups: LayerPropGroups) {
  // srcNode can be defined as either a node's "id" or the node itself.
  // Get the HTMLElement.
  let rootNode =
    typeof srcNode === "string"
      ? document.getElementById(srcNode)!
      : (srcNode as HTMLElement);

  // Get the root node by ID in control creation changed node root to different node type
  // and is no longer using the input root node.
  if (rootNode.id) {
    rootNode = document.getElementById(rootNode.id) || rootNode;
  }
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
  Array.from(listItems, li => {
    const label = li.querySelector("label");
    if (label) {
      const title = label.textContent!;
      const groupName = mapping.get(title) || "Other";
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
  /**
   * Gets the element that is hosting the control.
   */
  public get root() {
    return document.getElementById(this._nodeId);
  }
  // tslint:disable-next-line:variable-name
  protected _nodeId: string;
  constructor(options: GroupedLayerListOptions, srcNode: string | Node) {
    // If options.groups is defined, sort the layers to match group definition
    if (options.groups) {
      const originLayers: LayerListOperationalLayer[] = options.layers;
      const sortedLayers = new Array(
        ...enumerateLayersInGroupOrder(
          options.groups,
          options.layers,
          options.groupProperty,
          options.throwOnGroupNotFound
        )
      );
      // Append any layers that are not listed in the grouping object.
      originLayers
        .filter(l => !sortedLayers.includes(l))
        .forEach(l => sortedLayers.push(l));

      // Change the layers' order to match the group object.
      options.layers = sortedLayers.reverse();
    }
    // Get the "id" of the srcNode.
    const nodeId =
      srcNode === "string"
        ? srcNode
        : srcNode instanceof HTMLElement
        ? srcNode.id
        : null;
    super(options, srcNode);

    // Get the node "id" if one was autogenerated.
    this._nodeId =
      nodeId || typeof srcNode === "string"
        ? (srcNode as string)
        : (srcNode as HTMLElement).id;

    if (options.groups) {
      this.on("load", evt => {
        // Add group headers to the first layer's <li> using CSS :before pseudo-element.
        const cssText = addGroupHeadings(srcNode, options.groups!);
        const styleNode = document.createElement("style");
        styleNode.textContent = cssText;
        document.head!.appendChild(styleNode);
      });
    }
    if (options.metadata) {
      addMetadataTabs(this, options.metadataOptions);
    }
  }
}
