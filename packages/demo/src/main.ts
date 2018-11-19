// import modules
import GroupedLayerList, {
  convertLayer,
  CreateMapEvent,
  LayerPropGroups
} from "@wsdot/grouped-layer-list";
import arcgisUtils from "esri/arcgis/utils";
import esriConfig from "esri/config";

esriConfig.defaults.io.httpsDomains.push("wsdot.wa.gov");
esriConfig.defaults.io.corsEnabledServers.push(
  "wsdot.wa.gov",
  "data.wsdot.wa.gov"
);

// Define groupings. This object defines the layer order as well.
const groupings: LayerPropGroups = {
  Transportation: [
    "Rail",
    "State Routes",
    "Interchange Drawings",
    "Functional Class"
  ],
  "Political Boundaries": [
    "Region Boundaries",
    "Maintenance Areas",
    "Tribal Lands",
    "Township / Section",
    "Regional Transportation Planning (RTPO)",
    "Metro Planning Areas",
    "Legislative Districts",
    "County Boundaries",
    "Congressional Districts",
    "City Limits",
    "Urban Areas"
  ]
};

// Create the map using AGOL webmap.
arcgisUtils
  .createMap("d2666674071e4263ac344046f09b7599", "map")
  .then((evt: CreateMapEvent) => {
    const { map, itemInfo, errors } = evt;

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
        layers
      },
      "layerList"
    );

    layerList.startup();
  })
  // Handle errors from CreateMap function.
  .catch((err: Error) => {
    console.error("map creation error", err);
  });
