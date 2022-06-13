[@wsdot/grouped-layer-list](../README.md) / GroupedLayerListOptions

# Interface: GroupedLayerListOptions

Options for the GroupedLayerList constructor

## Hierarchy

- `LayerListOptions`

  ↳ **`GroupedLayerListOptions`**

## Table of contents

### Properties

- [groupProperty](GroupedLayerListOptions.md#groupproperty)
- [groups](GroupedLayerListOptions.md#groups)
- [layers](GroupedLayerListOptions.md#layers)
- [map](GroupedLayerListOptions.md#map)
- [metadata](GroupedLayerListOptions.md#metadata)
- [metadataOptions](GroupedLayerListOptions.md#metadataoptions)
- [removeUnderscores](GroupedLayerListOptions.md#removeunderscores)
- [showLegend](GroupedLayerListOptions.md#showlegend)
- [showOpacitySlider](GroupedLayerListOptions.md#showopacityslider)
- [showSubLayers](GroupedLayerListOptions.md#showsublayers)
- [theme](GroupedLayerListOptions.md#theme)
- [throwOnGroupNotFound](GroupedLayerListOptions.md#throwongroupnotfound)
- [visible](GroupedLayerListOptions.md#visible)

## Properties

### groupProperty

• `Optional` **groupProperty**: ``"id"`` \| ``"title"``

Which property do the arrays in "groups" correspond to: "id" or "title"?

#### Defined in

[packages/grouped-layer-list/src/main.ts:168](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L168)

___

### groups

• `Optional` **groups**: [`LayerPropGroups`](LayerPropGroups.md)

Defines how layers are grouped. Property names are group names.
Values correspond to either the title or id properties of operational layers.

#### Defined in

[packages/grouped-layer-list/src/main.ts:164](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L164)

___

### layers

• **layers**: `any`[]

An array of operational layers.

#### Inherited from

LayerListOptions.layers

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1327

___

### map

• **map**: `Map`

Reference to the map.

#### Inherited from

LayerListOptions.map

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1329

___

### metadata

• `Optional` **metadata**: `boolean`

Set to true to add the metadata tab to layers, false otherwise.

#### Defined in

[packages/grouped-layer-list/src/main.ts:176](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L176)

___

### metadataOptions

• `Optional` **metadataOptions**: [`IMetadataOptions`](IMetadataOptions.md)

Specifies the metadata format.

#### Defined in

[packages/grouped-layer-list/src/main.ts:180](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L180)

___

### removeUnderscores

• `Optional` **removeUnderscores**: `boolean`

Indicates whether to remove underscores from the layer title.

#### Inherited from

LayerListOptions.removeUnderscores

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1331

___

### showLegend

• `Optional` **showLegend**: `boolean`

Indicates whether to display a legend for the layer items.

#### Inherited from

LayerListOptions.showLegend

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1333

___

### showOpacitySlider

• `Optional` **showOpacitySlider**: `boolean`

Indicates whether to display the opacity slider.

#### Inherited from

LayerListOptions.showOpacitySlider

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1335

___

### showSubLayers

• `Optional` **showSubLayers**: `boolean`

Indicates whether to show sublayers in the list of layers.

#### Inherited from

LayerListOptions.showSubLayers

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1337

___

### theme

• `Optional` **theme**: `string`

The CSS class selector used to uniquely style the widget.

#### Inherited from

LayerListOptions.theme

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1339

___

### throwOnGroupNotFound

• `Optional` **throwOnGroupNotFound**: `boolean`

Set to true if you want to throw an exception when a referenced group cannot be found.

#### Defined in

[packages/grouped-layer-list/src/main.ts:172](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L172)

___

### visible

• `Optional` **visible**: `boolean`

Indicates whether to show the LayerList widget.

#### Inherited from

LayerListOptions.visible

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:1341
