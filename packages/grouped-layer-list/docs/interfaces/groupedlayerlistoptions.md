[@wsdot/grouped-layer-list](../README.md) > [GroupedLayerListOptions](../interfaces/groupedlayerlistoptions.md)

# Interface: GroupedLayerListOptions

Options for the GroupedLayerList constructor

## Hierarchy

 `LayerListOptions`

**↳ GroupedLayerListOptions**

## Index

### Properties

* [groupProperty](groupedlayerlistoptions.md#groupproperty)
* [groups](groupedlayerlistoptions.md#groups)
* [layers](groupedlayerlistoptions.md#layers)
* [map](groupedlayerlistoptions.md#map)
* [metadata](groupedlayerlistoptions.md#metadata)
* [metadataFormatterPage](groupedlayerlistoptions.md#metadataformatterpage)
* [removeUnderscores](groupedlayerlistoptions.md#removeunderscores)
* [showLegend](groupedlayerlistoptions.md#showlegend)
* [showOpacitySlider](groupedlayerlistoptions.md#showopacityslider)
* [showSubLayers](groupedlayerlistoptions.md#showsublayers)
* [theme](groupedlayerlistoptions.md#theme)
* [throwOnGroupNotFound](groupedlayerlistoptions.md#throwongroupnotfound)
* [visible](groupedlayerlistoptions.md#visible)

---

## Properties

<a id="groupproperty"></a>

### `<Optional>` groupProperty

**● groupProperty**: * "id" &#124; "title"
*

*Defined in [main.ts:164](https://github.com/WSDOT-GIS/grouped-layer-list/blob/1ae99b6/packages/grouped-layer-list/src/main.ts#L164)*

Which property do the arrays in "groups" correpsond to: "id" or "title"?

___
<a id="groups"></a>

### `<Optional>` groups

**● groups**: *[LayerPropGroups](layerpropgroups.md)*

*Defined in [main.ts:160](https://github.com/WSDOT-GIS/grouped-layer-list/blob/1ae99b6/packages/grouped-layer-list/src/main.ts#L160)*

Defines how layers are grouped. Property names are group names. Values correspond to either the title or id properties of operational layers.

___
<a id="layers"></a>

###  layers

**● layers**: *`any`[]*

*Inherited from LayerListOptions.layers*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1325*

An array of operational layers.

___
<a id="map"></a>

###  map

**● map**: *`Map`*

*Inherited from LayerListOptions.map*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1327*

Reference to the map.

___
<a id="metadata"></a>

### `<Optional>` metadata

**● metadata**: * `undefined` &#124; `false` &#124; `true`
*

*Defined in [main.ts:172](https://github.com/WSDOT-GIS/grouped-layer-list/blob/1ae99b6/packages/grouped-layer-list/src/main.ts#L172)*

Set to true to add the metadata tab to layers, false otherwise.

___
<a id="metadataformatterpage"></a>

### `<Optional>` metadataFormatterPage

**● metadataFormatterPage**: * `string` &#124; `null`
*

*Defined in [main.ts:176](https://github.com/WSDOT-GIS/grouped-layer-list/blob/1ae99b6/packages/grouped-layer-list/src/main.ts#L176)*

Specify the metadata formatter page. Set to null to instead show unformatted metadata.

___
<a id="removeunderscores"></a>

### `<Optional>` removeUnderscores

**● removeUnderscores**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from LayerListOptions.removeUnderscores*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1329*

Indicates whether to remove underscores from the layer title.

___
<a id="showlegend"></a>

### `<Optional>` showLegend

**● showLegend**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from LayerListOptions.showLegend*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1331*

Indicates whether to display a legend for the layer items.

___
<a id="showopacityslider"></a>

### `<Optional>` showOpacitySlider

**● showOpacitySlider**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from LayerListOptions.showOpacitySlider*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1333*

Indicates whether to display the opacity slider.

___
<a id="showsublayers"></a>

### `<Optional>` showSubLayers

**● showSubLayers**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from LayerListOptions.showSubLayers*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1335*

Indicates whether to show sublayers in the list of layers.

___
<a id="theme"></a>

### `<Optional>` theme

**● theme**: * `undefined` &#124; `string`
*

*Inherited from LayerListOptions.theme*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1337*

The CSS class selector used to uniquely style the widget.

___
<a id="throwongroupnotfound"></a>

### `<Optional>` throwOnGroupNotFound

**● throwOnGroupNotFound**: * `undefined` &#124; `false` &#124; `true`
*

*Defined in [main.ts:168](https://github.com/WSDOT-GIS/grouped-layer-list/blob/1ae99b6/packages/grouped-layer-list/src/main.ts#L168)*

Set to true if you want to throw an exception when a referenced group cannot be found.

___
<a id="visible"></a>

### `<Optional>` visible

**● visible**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from LayerListOptions.visible*

*Defined in C:/Users/jacobsj/Documents/GitHub/categorized-layer-list/packages/grouped-layer-list/node_modules/@types/arcgis-js-api/index.d.ts:1339*

Indicates whether to show the LayerList widget.

___

