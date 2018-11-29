[@wsdot/grouped-layer-list](../README.md) > [CreateMapOperationalLayer](../interfaces/createmapoperationallayer.md)

# Interface: CreateMapOperationalLayer

Operational layer property from the returned object of a createMap operation.

## Hierarchy

 [OperationalLayerCommon](operationallayercommon.md)

**↳ CreateMapOperationalLayer**

## Indexable

\[key: `string`\]:&nbsp;`any`
Operational layer property from the returned object of a createMap operation.

## Index

### Properties

* [errors](createmapoperationallayer.md#errors)
* [id](createmapoperationallayer.md#id)
* [layerObject](createmapoperationallayer.md#layerobject)
* [layerType](createmapoperationallayer.md#layertype)
* [resourceInfo](createmapoperationallayer.md#resourceinfo)
* [title](createmapoperationallayer.md#title)
* [url](createmapoperationallayer.md#url)
* [visibility](createmapoperationallayer.md#visibility)

---

## Properties

<a id="errors"></a>

###  errors

**● errors**: *`Error`[]*

*Defined in [main.ts:32](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L32)*

A collection of errors that were encountered when adding the layer to the map.

___
<a id="id"></a>

### `<Optional>` id

**● id**: * `undefined` &#124; `string`
*

*Inherited from [OperationalLayerCommon](operationallayercommon.md).[id](operationallayercommon.md#id)*

*Defined in [main.ts:19](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L19)*

___
<a id="layerobject"></a>

###  layerObject

**● layerObject**: *`Layer`*

*Defined in [main.ts:34](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L34)*

"esri/layers/layer" object.

___
<a id="layertype"></a>

###  layerType

**● layerType**: *`string`*

*Defined in [main.ts:36](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L36)*

The type of layer.

___
<a id="resourceinfo"></a>

###  resourceInfo

**● resourceInfo**: *`any`*

*Defined in [main.ts:38](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L38)*

Resource information

___
<a id="title"></a>

### `<Optional>` title

**● title**: * `undefined` &#124; `string`
*

*Inherited from [OperationalLayerCommon](operationallayercommon.md).[title](operationallayercommon.md#title)*

*Defined in [main.ts:21](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L21)*

Optional The title of the layer.

___
<a id="url"></a>

###  url

**● url**: *`string`*

*Defined in [main.ts:40](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L40)*

layer URL

___
<a id="visibility"></a>

### `<Optional>` visibility

**● visibility**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from [OperationalLayerCommon](operationallayercommon.md).[visibility](operationallayercommon.md#visibility)*

*Defined in [main.ts:23](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L23)*

Optional Indicates whether to set the default visibility.

___

