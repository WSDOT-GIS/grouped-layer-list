Grouped Layer List
------------------

For [ArcGIS API for JavaScript version 3.X], an extension of [LayerList] which will allow group headings to be added via CSS. (The [LayerList of V4][LayerListV4] already supports grouping.)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Usage

### Install package

Install the `@wsdot/grouped-layer-list` package along with other requirements.

```console
npm install -sd @wsdot/grouped-layer-list @types/arcgis-js-api@3 typescript tslint webpack webpack-cli ts-loader source-map
```

### src/main.ts
```typescript
// import modules
import GroupedLayerList, {
  convertLayer,
  CreateMapEvent,
  LayerPropGroups
} from "@wsdot/grouped-layer-list";
import arcgisUtils from "esri/arcgis/utils";

// Define groupings. This object defines the layer order as well.
// Array items should correspond to layer titles defined in your AGOL map.
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
    const layers = itemInfo.itemData.operationalLayers.map(convertLayer);

    // Create the layer list.
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
  })
  // Handle errors from CreateMap function.
  .catch((err: Error) => {
    console.error("map creation error", err);
  });

```

[ArcGIS API for JavaScript version 3.X]:https://developers.arcgis.com/javascript/3
[LayerList]:https://developers.arcgis.com/javascript/3/jsapi/layerlist-amd.html
[LayerListV4]:https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList.html