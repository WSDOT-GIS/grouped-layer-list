[@wsdot/grouped-layer-list](../README.md) > [GroupedLayerList](../classes/groupedlayerlist.md)

# Class: GroupedLayerList

An extension of esri/dijit/LayerList that supports grouping.

## Hierarchy

 `LayerList`

**↳ GroupedLayerList**

## Index

### Constructors

* [constructor](groupedlayerlist.md#constructor)

### Properties

* [layers](groupedlayerlist.md#layers)
* [loaded](groupedlayerlist.md#loaded)
* [map](groupedlayerlist.md#map)
* [removeUnderscores](groupedlayerlist.md#removeunderscores)
* [showLegend](groupedlayerlist.md#showlegend)
* [showOpacitySlider](groupedlayerlist.md#showopacityslider)
* [showSubLayers](groupedlayerlist.md#showsublayers)
* [theme](groupedlayerlist.md#theme)
* [visible](groupedlayerlist.md#visible)

### Methods

* [destroy](groupedlayerlist.md#destroy)
* [on](groupedlayerlist.md#on)
* [refresh](groupedlayerlist.md#refresh)
* [startup](groupedlayerlist.md#startup)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GroupedLayerList**(options: *[GroupedLayerListOptions](../interfaces/groupedlayerlistoptions.md)*, srcNode: * `string` &#124; `Node`*): [GroupedLayerList](groupedlayerlist.md)

*Overrides LayerList.__constructor*

*Defined in [main.ts:319](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/main.ts#L319)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [GroupedLayerListOptions](../interfaces/groupedlayerlistoptions.md) |
| srcNode |  `string` &#124; `Node`|

**Returns:** [GroupedLayerList](groupedlayerlist.md)

___

## Properties

<a id="layers"></a>

###  layers

**● layers**: *`any`[]*

*Inherited from LayerList.layers*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4779*

An array of operational layers.

___
<a id="loaded"></a>

###  loaded

**● loaded**: *`boolean`*

*Inherited from LayerList.loaded*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4781*

Indicates whether the widget has been loaded.

___
<a id="map"></a>

###  map

**● map**: *`Map`*

*Inherited from LayerList.map*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4783*

Reference to the map.

___
<a id="removeunderscores"></a>

###  removeUnderscores

**● removeUnderscores**: *`boolean`*

*Inherited from LayerList.removeUnderscores*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4785*

Indicates whether to remove underscores from the layer title

___
<a id="showlegend"></a>

###  showLegend

**● showLegend**: *`boolean`*

*Inherited from LayerList.showLegend*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4787*

Indicates whether to display a legend for the layer items.

___
<a id="showopacityslider"></a>

###  showOpacitySlider

**● showOpacitySlider**: *`boolean`*

*Inherited from LayerList.showOpacitySlider*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4789*

Indicates whether to display the opacity slider.

___
<a id="showsublayers"></a>

###  showSubLayers

**● showSubLayers**: *`boolean`*

*Inherited from LayerList.showSubLayers*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4791*

Indicates whether to show sublayers in the list of layers.

___
<a id="theme"></a>

###  theme

**● theme**: *`string`*

*Inherited from LayerList.theme*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4793*

CSS Class for uniquely styling the widget.

___
<a id="visible"></a>

###  visible

**● visible**: *`boolean`*

*Inherited from LayerList.visible*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4795*

Indicates whether to show the widget.

___

## Methods

<a id="destroy"></a>

###  destroy

▸ **destroy**(): `void`

*Inherited from LayerList.destroy*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4803*

Destroy the LayerList widget.

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(type: *"load"*, listener: *`function`*): `Handle`

▸ **on**(type: *"refresh"*, listener: *`function`*): `Handle`

▸ **on**(type: *"toggle"*, listener: *`function`*): `Handle`

▸ **on**(type: *`string`*, listener: *`function`*): `Handle`

*Inherited from LayerList.on*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4809*

Fired when the LayerList widget has fully loaded.

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | "load" |
| listener | `function` |

**Returns:** `Handle`

*Inherited from LayerList.on*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4811*

Fired when refresh() is called on the widget.

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | "refresh" |
| listener | `function` |

**Returns:** `Handle`

*Inherited from LayerList.on*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4813*

Fired when the layer is toggled on/off within the widget.

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | "toggle" |
| listener | `function` |

**Returns:** `Handle`

*Inherited from LayerList.on*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4814*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` |
| listener | `function` |

**Returns:** `Handle`

___
<a id="refresh"></a>

###  refresh

▸ **refresh**(): `void`

*Inherited from LayerList.refresh*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4805*

Reloads all layers and properties that may have changed.

**Returns:** `void`

___
<a id="startup"></a>

###  startup

▸ **startup**(): `void`

*Inherited from LayerList.startup*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:4807*

Finalizes the creation of the LayerList widget.

**Returns:** `void`

___

