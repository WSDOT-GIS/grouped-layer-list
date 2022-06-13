[@wsdot/grouped-layer-list](../README.md) / CreateMapOperationalLayer

# Interface: CreateMapOperationalLayer

Operational layer property from the returned object of a createMap operation.

## Hierarchy

- [`OperationalLayerCommon`](OperationalLayerCommon.md)

  ↳ **`CreateMapOperationalLayer`**

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [errors](CreateMapOperationalLayer.md#errors)
- [id](CreateMapOperationalLayer.md#id)
- [layerObject](CreateMapOperationalLayer.md#layerobject)
- [layerType](CreateMapOperationalLayer.md#layertype)
- [resourceInfo](CreateMapOperationalLayer.md#resourceinfo)
- [title](CreateMapOperationalLayer.md#title)
- [url](CreateMapOperationalLayer.md#url)
- [visibility](CreateMapOperationalLayer.md#visibility)

## Properties

### errors

• **errors**: `Error`[]

A collection of errors that were encountered when adding the layer to the map.

#### Defined in

[packages/grouped-layer-list/src/main.ts:38](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L38)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[OperationalLayerCommon](OperationalLayerCommon.md).[id](OperationalLayerCommon.md#id)

#### Defined in

[packages/grouped-layer-list/src/main.ts:25](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L25)

___

### layerObject

• **layerObject**: `Layer`

"esri/layers/layer" object.

#### Defined in

[packages/grouped-layer-list/src/main.ts:40](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L40)

___

### layerType

• **layerType**: `string`

The type of layer.

#### Defined in

[packages/grouped-layer-list/src/main.ts:42](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L42)

___

### resourceInfo

• **resourceInfo**: `any`

Resource information

#### Defined in

[packages/grouped-layer-list/src/main.ts:44](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L44)

___

### title

• `Optional` **title**: `string`

Optional 	The title of the layer.

#### Inherited from

[OperationalLayerCommon](OperationalLayerCommon.md).[title](OperationalLayerCommon.md#title)

#### Defined in

[packages/grouped-layer-list/src/main.ts:27](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L27)

___

### url

• **url**: `string`

layer URL

#### Defined in

[packages/grouped-layer-list/src/main.ts:46](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L46)

___

### visibility

• `Optional` **visibility**: `boolean`

Optional 	Indicates whether to set the default visibility.

#### Inherited from

[OperationalLayerCommon](OperationalLayerCommon.md).[visibility](OperationalLayerCommon.md#visibility)

#### Defined in

[packages/grouped-layer-list/src/main.ts:29](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L29)
