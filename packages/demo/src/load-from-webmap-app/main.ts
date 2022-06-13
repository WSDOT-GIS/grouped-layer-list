import GroupedLayerList, {
  convertLayer,
  createLayerLink,
  CreateMapEvent,
  getGroupsFromCreateMapItem,
  setOperationalLayers
} from "@wsdot/grouped-layer-list";
import BorderContainer from "dijit/layout/BorderContainer";
import ContentPane from "dijit/layout/ContentPane";
import arcgisUtils from "esri/arcgis/utils";
import esriConfig from "esri/config";
import HomeButton from "esri/dijit/HomeButton";
import Extent from "esri/geometry/Extent";
import { FormatError } from "../FormatError";
import { createSourceLink } from "../GithubLink";
import { createWebmapIdForm } from "../WebmapSelector";

esriConfig.defaults.io.httpsDomains.push("wsdot.wa.gov");
esriConfig.defaults.io.corsEnabledServers.push(
  "wsdot.wa.gov",
  "data.wsdot.wa.gov"
);

const borderContainer = new BorderContainer(
  { liveSplitters: true },
  "container"
);
const layerListPane = new ContentPane(
  { region: "left", style: "width: 300px; padding: 0", splitter: true },
  "layerListContainer"
);
const mapPane = new ContentPane(
  { region: "center", style: "padding: 0" },
  "mapContainer"
);
borderContainer.addChild(layerListPane);
borderContainer.addChild(mapPane);
borderContainer.startup();

const mapInput = createWebmapIdForm();

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

    const mapButtonDiv = document.createElement("button");
    mapButtonDiv.id = "homeButton";
    map.root.appendChild(mapButtonDiv);

    const homeButton = new HomeButton(
      {
        visible: true,
        map
      },
      mapButtonDiv
    );
    homeButton.startup();

    map.root.appendChild(mapInput);

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

    const urlSupported = window.URL && window.URLSearchParams && window.history;

    if (urlSupported) {
      const url = new URL(location.href);
      const { searchParams } = url;
      if (searchParams) {
        setOperationalLayers(searchParams, layers);
      }
    }

    // Create the layer list.
    const layerList = new GroupedLayerList(
      {
        groups: groupings,
        groupProperty: "title",
        map,
        metadata: true,
        layers,
        throwOnGroupNotFound: false,
        metadataOptions: {
          format: "fgdc"
        }
      },
      "layerList"
    );

    createLayerLink(layerList);

    layerList.startup();

    try {
      const sourceLink = createSourceLink(
        "https://www.github.com/wsdot-gis/grouped-layer-list"
      );
      map.root.appendChild(sourceLink);
    } catch (err) {
      if (!(err instanceof FormatError)) {
        throw err;
      }
    }
  })
  // Handle errors from CreateMap function.
  .catch((err: Error) => {
    console.error("map creation error", err);
  });
