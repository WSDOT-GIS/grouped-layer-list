import GroupedLayerList, {
  convertLayer,
  createLayerLink,
  CreateMapEvent,
  fromGeoportalLayers,
  getGroupsFromCreateMapItem,
  setOperationalLayers
} from "@wsdot/grouped-layer-list";
import BorderContainer from "dijit/layout/BorderContainer";
import ContentPane from "dijit/layout/ContentPane";
import arcgisUtils from "esri/arcgis/utils";
import esriConfig from "esri/config";
import HomeButton from "esri/dijit/HomeButton";
import Extent from "esri/geometry/Extent";
import EsriMap from "esri/map";
import { FormatError } from "../FormatError";
import { createSourceLink } from "../GithubLink";
import { layers as configLayers } from "./config.json";

console.log("config", configLayers);

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

/**
 * Extent of WA.
 * @see https://epsg.io/1416-area
 */
const waExtent = new Extent({
  xmin: -124.79,
  ymin: 45.54,
  xmax: -116.91,
  ymax: 49.05
});

const { groups, layers } = fromGeoportalLayers(configLayers);

const map = new EsriMap("map", {
  basemap: "dark-gray-vector",
  extent: getExtentFromUrl() || waExtent
});

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

// Add the operational layers' layers to the map.
map.addLayers(layers.map(opLayer => opLayer.layer!));

// Create the layer list.
const layerList = new GroupedLayerList(
  {
    groups,
    showLegend: true,
    showOpacitySlider: true,
    showSubLayers: true,
    groupProperty: "title",
    map,
    metadata: true,
    layers,
    throwOnGroupNotFound: false
  },
  "layerList"
);

const urlSupported = window.URL && window.URLSearchParams && window.history;

if (urlSupported) {
  createLayerLink(layerList);

  layerList.on("load", () => {
    const url = new URL(location.href);
    const { searchParams } = url;
    if (searchParams) {
      setOperationalLayers(searchParams, layerList);
    }
  });
}

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
