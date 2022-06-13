[@wsdot/grouped-layer-list](../README.md) / LayerListOperationalLayer

# Interface: LayerListOperationalLayer

Defines a map layer for a layer list.

## Hierarchy

- [`OperationalLayerCommon`](OperationalLayerCommon.md)

  ↳ **`LayerListOperationalLayer`**

## Table of contents

### Properties

- [button](LayerListOperationalLayer.md#button)
- [content](LayerListOperationalLayer.md#content)
- [featureCollection](LayerListOperationalLayer.md#featurecollection)
- [id](LayerListOperationalLayer.md#id)
- [layer](LayerListOperationalLayer.md#layer)
- [showLegend](LayerListOperationalLayer.md#showlegend)
- [showOpacitySlider](LayerListOperationalLayer.md#showopacityslider)
- [showSubLayers](LayerListOperationalLayer.md#showsublayers)
- [title](LayerListOperationalLayer.md#title)
- [visibility](LayerListOperationalLayer.md#visibility)

## Properties

### button

• `Optional` **button**: `string` \| `Node`

Optional 	Custom button node that will appear within the layer title.

#### Defined in

[packages/grouped-layer-list/src/main.ts:54](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L54)

___

### content

• `Optional` **content**: `string` \| `Node`

Optional 	Custom node to insert the content. It displays below the title.

#### Defined in

[packages/grouped-layer-list/src/main.ts:56](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L56)

___

### featureCollection

• `Optional` **featureCollection**: `Layer`

Required 	Layer's feature collection. This is required if a layer is not specified.

#### Defined in

[packages/grouped-layer-list/src/main.ts:58](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L58)

___

### id

• `Optional` **id**: `string`

Optional 	The layers id.

#### Overrides

[OperationalLayerCommon](OperationalLayerCommon.md).[id](OperationalLayerCommon.md#id)

#### Defined in

[packages/grouped-layer-list/src/main.ts:60](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L60)

___

### layer

• `Optional` **layer**: `Layer`

Required 	The layer object. This is required unless using a feature collection.

#### Defined in

[packages/grouped-layer-list/src/main.ts:62](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L62)

___

### showLegend

• `Optional` **showLegend**: `boolean`

Optional 	Indicates whether to display a legend for the layer items.

#### Defined in

[packages/grouped-layer-list/src/main.ts:64](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L64)

___

### showOpacitySlider

• `Optional` **showOpacitySlider**: `boolean`

Optional 	Indicates whether to display the opacity slider.

#### Defined in

[packages/grouped-layer-list/src/main.ts:66](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L66)

___

### showSubLayers

• `Optional` **showSubLayers**: `boolean`

Optional 	Indicates whether to show sublayers for this layer. Prior to version 3.15, this was named sublayers.

#### Defined in

[packages/grouped-layer-list/src/main.ts:68](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L68)

___

### title

• `Optional` **title**: `string`

Optional 	The title of the layer.

#### Inherited from

[OperationalLayerCommon](OperationalLayerCommon.md).[title](OperationalLayerCommon.md#title)

#### Defined in

[packages/grouped-layer-list/src/main.ts:27](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L27)

___

### visibility

• `Optional` **visibility**: `boolean`

Optional 	Indicates whether to set the default visibility.

#### Inherited from

[OperationalLayerCommon](OperationalLayerCommon.md).[visibility](OperationalLayerCommon.md#visibility)

#### Defined in

[packages/grouped-layer-list/src/main.ts:29](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L29)
