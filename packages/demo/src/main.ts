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

arcgisUtils
  .createMap("d2666674071e4263ac344046f09b7599", "map")
  .then((evt: CreateMapEvent) => {
    const { map, itemInfo, errors } = evt;

    // If there were errors creating the map,
    if (errors && errors.length > 0) {
      console.group("create map error");
      errors.forEach(e => console.error(e));
      console.groupEnd();
    }

    const layers = itemInfo.itemData.operationalLayers.map(convertLayer);

    const layerList = new GroupedLayerList(
      {
        groups: groupings,
        groupProperty: "title",
        map,
        layers
      },
      "layerList"
    );
    layerList.startup();

    // TODO: Make working layer list toggle button.
    // const mapRoot = document.getElementById("map_root");
    // if (!mapRoot) {
    //   throw new Error("#map_root not found");
    // }

    // const button = document.createElement("button");
    // button.textContent = "layerList";
    // button.id = "layerListToggleButton";
    // mapRoot.appendChild(button);

    // button.addEventListener(
    //   "click",
    //   () => {
    //     const layerListDom = document.querySelector(
    //       "#container > .esriLayerList"
    //     )!;
    //     layerListDom.classList.toggle("hidden");
    //   },
    //   {
    //     passive: true
    //   }
    // );
  })
  .catch((err: Error) => {
    console.error("map creation error", err);
  });
