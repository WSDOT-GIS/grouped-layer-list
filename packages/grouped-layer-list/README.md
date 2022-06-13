# Grouped Layer List

For [ArcGIS API for JavaScript version 3.X], an extension of [LayerList] which will allow group headings to be added via CSS. (The [LayerList of V4][layerlistv4] already supports grouping.)

## Additional features provided

- Adds group headings
- Adds metadata tabs for map service layers that support the [Layer Metadata SOE].

[![Demo](https://img.shields.io/badge/Pages-demo-blue.svg?logo=github&longCache=true)][demo]
[![Issues on GitHub](https://img.shields.io/github/issues/wsdot-gis/grouped-layer-list.svg?style=flat-square)][issues]
[![npm version](https://img.shields.io/npm/v/@wsdot/grouped-layer-list.svg?style=flat-square)][package]
[![npm license](https://img.shields.io/npm/l/@wsdot/grouped-layer-list.svg?style=flat-square)][package]
[![npm downloads](https://img.shields.io/npm/dm/@wsdot/grouped-layer-list.svg?style=flat-square)][package]

## Usage

A sample application can be found [here](https://github.com/WSDOT-GIS/grouped-layer-list/tree/master/packages/demo).

[API documentation](./docs/README.md)

Install the `@wsdot/grouped-layer-list` package along with other requirements for your project.

```console
npm install -SD @wsdot/grouped-layer-list @types/arcgis-js-api@3 typescript tslint webpack webpack-cli ts-loader source-map
```

Add a `layerGrouping` section to your [web map]'s [applicationProperties.viewing] section. A web map's JSON can be edited using [ArcGIS Online Assistant].

In the example below, "Transportation" and "Political Boundaries" are group names. The arrays contain [operationalLayer] titles.

```json
{
    "applicationProperties": {
        "viewing": {
            "layerGrouping": {
                "enabled": true,
                "groups": {
                  "Transportation": [
                    "Rail",
                    "State Routes",
                    "Interchange Drawings",
                    "Functional Class",
                    "Mileposts"
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
                }
            },
        }
    }
}
```

Sample TypeScript code which performs the following:

1. Import modules
2. Create Map
3. Get map groupings object
4. Get operational layers
5. Convert operational layers to format expectedc by [LayerList] constructor
6. Create and startup `GroupedLayerList`.

```typescript
import GroupedLayerList, {
  convertLayer,
  CreateMapEvent,
  getGroupsFromCreateMapItem,
} from "@wsdot/grouped-layer-list";
import arcgisUtils from "esri/arcgis/utils";

const mapId = "put-your-agol-map-id-here";

// map will be created in a DOM element with the "id" of "map".
arcgisUtils.createMap(mapId, "map").then((evt: CreateMapEvent) => {
    const { map, itemInfo } = evt;

    // get the groupings defined in ArcGIS Online webmap item.
    // Alternatively, the grouping info could just be written in a variable if you don't
    // want to store in AGOL webmap item. (E.g., if webmap maintainer isn't comfortable editing item's JSON.)
    const groupings = getGroupsFromCreateMapItem(itemInfo);

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
      "layerList" // DOM element "id" attribute value
    );

    layerList.startup();
  });
```

### Polyfills for older browsers

In order to work on older browsers (e.g., if you still need to support IE 11), you will need to use polyfills. The following features will need to be supported. (Polyfills should not be required with modern browsers.)

* [Promise](https://caniuse.com/#feat=promises)
* [fetch](https://caniuse.com/#feat=fetch)
* [Array.prototype.find](https://caniuse.com/#feat=array-find)
* [Array.prototype.includes](https://caniuse.com/#feat=array-includes)
* [Array.prototype.forEach](https://kangax.github.io/compat-table/es5/#test-Array.prototype.forEach)

#### Example: using Polyfill.io

Add to the `<head>` of your HTML page: https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Promise,Array.prototype.find,Array.prototype.includes,Array.prototype.forEach,fetch

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- ... -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Promise,Array.prototype.find,Array.prototype.includes,Array.prototype.forEach,fetch"></script>
</head>

<body class="claro">
  <!-- ... -->
</body>

</html>
```
`https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Promise,Array.prototype.find,Array.prototype.includes,Array.prototype.forEach,fetch`


[arcgis api for javascript version 3.x]: https://developers.arcgis.com/javascript/3
[applicationProperties.viewing]:https://developers.arcgis.com/web-map-specification/objects/viewing/
[demo]:https://wsdot-gis.github.io/grouped-layer-list
[issues]:https://github.com/wsdot-gis/grouped-layer-list/issues
[layer metadata soe]: https://github.com/WSDOT-GIS/LayerMetadataSoe
[layerlist]: https://developers.arcgis.com/javascript/3/jsapi/layerlist-amd.html
[layerlistv4]: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList.html
[operationalLayer]:https://developers.arcgis.com/web-map-specification/objects/operationalLayers/
[package]:https://www.npmjs.org/package/@wsdot/grouped-layer-list
[web map]:https://developers.arcgis.com/web-map-specification/
[ArcGIS Online Assistant]:https://ago-assistant.esri.com/