import GroupedLayerList from "@wsdot/grouped-layer-list";
import arcgisUtils from "esri/arcgis/utils";
import esriConfig from "esri/config";
import ArcGISDynamicMapServiceLayer from "esri/layers/ArcGISDynamicMapServiceLayer";
import Layer from "esri/layers/layer";
import EsriMap from "esri/map";

esriConfig.defaults.io.httpsDomains.push("wsdot.wa.gov");
esriConfig.defaults.io.corsEnabledServers.push(
  "wsdot.wa.gov",
  "data.wsdot.wa.gov"
);

const groupings: { [groupName: string]: string[] } = {
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

interface OperationalLayerCommon {
  id?: string;
  /** Optional 	The title of the layer. */
  title?: string;
  /** Optional 	Indicates whether to set the default visibility. */
  visibility?: boolean;
}

interface CreateMapOperationalLayer extends OperationalLayerCommon {
  [key: string]: any;
  errors: Error[];
  layerObject: Layer;
  layerType: string;
  resourceInfo: any;
  url: string;
}

interface LayerListOperationalLayer extends OperationalLayerCommon {
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

interface CreateMapEvent {
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

function convertLayer(
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

arcgisUtils
  .createMap("d2666674071e4263ac344046f09b7599", "map")
  .then((evt: CreateMapEvent) => {
    console.log("createMap", evt);
    const { map, itemInfo, errors } = evt;

    if (errors && errors.length > 0) {
      console.group("create map error");
      errors.forEach(e => console.error(e));
      console.groupEnd();
      return;
    }

    const layerList = new GroupedLayerList(
      {
        map,
        layers: itemInfo.itemData.operationalLayers.map(convertLayer)
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
  });
