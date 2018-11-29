import GroupedLayerList, {
  convertLayer,
  CreateMapEvent,
  getGroupsFromCreateMapItem
} from "@wsdot/grouped-layer-list";
import arcgisUtils from "esri/arcgis/utils";
import esriConfig from "esri/config";
import Extent from "esri/geometry/Extent";
import { createLayerLink, setOperationalLayers } from "./searchUtils";

esriConfig.defaults.io.httpsDomains.push("wsdot.wa.gov");
esriConfig.defaults.io.corsEnabledServers.push(
  "wsdot.wa.gov",
  "data.wsdot.wa.gov"
);

/**
 * Gets the map ID from URL search parameter. Returns a default value
 * if there is no webmap URL search parameter.
 */
function getMapIDFromUrl() {
  const defaultMapId = "d2666674071e4263ac344046f09b7599";
  const re = /\bwebmap=([a-f0-9]+)\b/i;
  const match = location.search ? location.search.match(re) : null;
  if (!match) {
    return defaultMapId;
  }
  // groupings = {};
  return match[1];
}

/**
 * Gets extent from URL if one is defined there.
 */
function getExtentFromUrl() {
  const url = new URL(location.href);
  const extStr = url.searchParams.get("map-extent");
  if (!extStr) {
    return undefined;
  }

  const [xmin, ymin, xmax, ymax] = extStr
    .split(/[\s,]/g)
    .map(s => parseFloat(s));

  const extent = new Extent({
    xmin,
    ymin,
    xmax,
    ymax,
    spatialReference: { wkid: 4326 }
  });
  return extent;
}

// Set default map ID.
// Override default map ID if one is defined in URL search params.
const mapId = getMapIDFromUrl();

// Create the map using AGOL webmap.
arcgisUtils
  .createMap(mapId, "map", {
    mapOptions: {
      extent: getExtentFromUrl() || undefined
    }
  })
  .then((evt: CreateMapEvent) => {
    const { map, itemInfo, errors } = evt;

    // get the groupings defined in ArcGIS Online webmap item.
    const groupings = getGroupsFromCreateMapItem(itemInfo) || undefined;

    // If there were errors creating the map, write them to the console.
    if (errors && errors.length > 0) {
      console.group("create map error");
      errors.forEach(e => console.error(e));
      console.groupEnd();
    }

    // Convert operational layers from the format returned by the createMap function
    // To the format needed by the LayerList constructor.
    // const layers = arcgisUtils.getLayerList(evt) as LayerListOperationalLayer[];
    const layers = itemInfo.itemData.operationalLayers.map(convertLayer);

    // Create the layer list.
    const layerList = new GroupedLayerList(
      {
        groups: groupings,
        groupProperty: "title",
        map,
        metadata: true,
        layers,
        throwOnGroupNotFound: false
      },
      "layerList"
    );

    createLayerLink(layerList);

    const urlSupported = window.URL && window.URLSearchParams && window.history;

    if (urlSupported) {
      layerList.on("load", () => {
        const url = new URL(location.href);
        const { searchParams } = url;
        if (searchParams) {
          setOperationalLayers(searchParams, layerList);
        }
      });
    }

    layerList.startup();
  })
  // Handle errors from CreateMap function.
  .catch((err: Error) => {
    console.error("map creation error", err);
  });
