[@wsdot/grouped-layer-list](../README.md) / default

# Class: default

An extension of esri/dijit/LayerList that supports grouping.

## Hierarchy

- `LayerList`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [\_nodeId](default.md#_nodeid)
- [layers](default.md#layers)
- [loaded](default.md#loaded)
- [map](default.md#map)
- [removeUnderscores](default.md#removeunderscores)
- [showLegend](default.md#showlegend)
- [showOpacitySlider](default.md#showopacityslider)
- [showSubLayers](default.md#showsublayers)
- [theme](default.md#theme)
- [visible](default.md#visible)

### Accessors

- [root](default.md#root)

### Methods

- [destroy](default.md#destroy)
- [on](default.md#on)
- [refresh](default.md#refresh)
- [startup](default.md#startup)

## Constructors

### constructor

• **new default**(`options`, `srcNode`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GroupedLayerListOptions`](../interfaces/GroupedLayerListOptions.md) |
| `srcNode` | `string` \| `Node` |

#### Overrides

LayerList.constructor

#### Defined in

[packages/grouped-layer-list/src/main.ts:338](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L338)

## Properties

### \_nodeId

• `Protected` **\_nodeId**: `string`

#### Defined in

[packages/grouped-layer-list/src/main.ts:337](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L337)

___

### layers

• **layers**: `any`[]

An array of operational layers.

#### Inherited from

LayerList.layers

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4854

___

### loaded

• **loaded**: `boolean`

Indicates whether the widget has been loaded.

#### Inherited from

LayerList.loaded

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4856

___

### map

• **map**: `Map`

Reference to the map.

#### Inherited from

LayerList.map

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4858

___

### removeUnderscores

• **removeUnderscores**: `boolean`

Indicates whether to remove underscores from the layer title

#### Inherited from

LayerList.removeUnderscores

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4860

___

### showLegend

• **showLegend**: `boolean`

Indicates whether to display a legend for the layer items.

#### Inherited from

LayerList.showLegend

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4862

___

### showOpacitySlider

• **showOpacitySlider**: `boolean`

Indicates whether to display the opacity slider.

#### Inherited from

LayerList.showOpacitySlider

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4864

___

### showSubLayers

• **showSubLayers**: `boolean`

Indicates whether to show sublayers in the list of layers.

#### Inherited from

LayerList.showSubLayers

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4866

___

### theme

• **theme**: `string`

CSS Class for uniquely styling the widget.

#### Inherited from

LayerList.theme

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4868

___

### visible

• **visible**: `boolean`

Indicates whether to show the widget.

#### Inherited from

LayerList.visible

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4870

## Accessors

### root

• `get` **root**(): ``null`` \| `HTMLElement`

Gets the element that is hosting the control.

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[packages/grouped-layer-list/src/main.ts:333](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L333)

## Methods

### destroy

▸ **destroy**(): `void`

Destroy the LayerList widget.

#### Returns

`void`

#### Inherited from

LayerList.destroy

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4878

___

### on

▸ **on**(`type`, `listener`): `Handle`

Fired when the LayerList widget has fully loaded.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"load"`` |
| `listener` | (`event`: { `target`: `LayerList`  }) => `void` |

#### Returns

`Handle`

#### Inherited from

LayerList.on

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4884

▸ **on**(`type`, `listener`): `Handle`

Fired when refresh() is called on the widget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"refresh"`` |
| `listener` | (`event`: { `target`: `LayerList`  }) => `void` |

#### Returns

`Handle`

#### Inherited from

LayerList.on

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4886

▸ **on**(`type`, `listener`): `Handle`

Fired when the layer is toggled on/off within the widget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"toggle"`` |
| `listener` | (`event`: { `layerIndex`: `number` ; `subLayerIndex`: `number` ; `target`: `LayerList` ; `visible`: `boolean`  }) => `void` |

#### Returns

`Handle`

#### Inherited from

LayerList.on

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4888

▸ **on**(`type`, `listener`): `Handle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | (`event`: `any`) => `void` |

#### Returns

`Handle`

#### Inherited from

LayerList.on

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4889

___

### refresh

▸ **refresh**(): `void`

Reloads all layers and properties that may have changed.

#### Returns

`void`

#### Inherited from

LayerList.refresh

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4880

___

### startup

▸ **startup**(): `void`

Finalizes the creation of the LayerList widget.

#### Returns

`void`

#### Inherited from

LayerList.startup

#### Defined in

node_modules/@types/arcgis-js-api/index.d.ts:4882
