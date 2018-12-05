[@wsdot/grouped-layer-list](../README.md) > [LayerSettings](../classes/layersettings.md)

# Class: LayerSettings

Stores settings for individual layers.

## Hierarchy

**LayerSettings**

## Implements

* [ILayerSettings](../interfaces/ilayersettings.md)

## Index

### Constructors

* [constructor](layersettings.md#constructor)

### Properties

* [visible](layersettings.md#visible)
* [visibleLayers](layersettings.md#visiblelayers)

### Methods

* [apply](layersettings.md#apply)
* [toString](layersettings.md#tostring)
* [parse](layersettings.md#parse)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LayerSettings**(options?: *[ILayerSettings](../interfaces/ilayersettings.md)*): [LayerSettings](layersettings.md)

*Defined in [LayerSettings.ts:50](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/LayerSettings.ts#L50)*

Creates a new instance

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [ILayerSettings](../interfaces/ilayersettings.md) |  An object that implements ILayerSettings. |

**Returns:** [LayerSettings](layersettings.md)

___

## Properties

<a id="visible"></a>

### `<Optional>` visible

**● visible**: * `undefined` &#124; `false` &#124; `true`
*

*Implementation of [ILayerSettings](../interfaces/ilayersettings.md).[visible](../interfaces/ilayersettings.md#visible)*

*Defined in [LayerSettings.ts:48](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/LayerSettings.ts#L48)*

is the layer visible

___
<a id="visiblelayers"></a>

### `<Optional>` visibleLayers

**● visibleLayers**: *`number`[]*

*Implementation of [ILayerSettings](../interfaces/ilayersettings.md).[visibleLayers](../interfaces/ilayersettings.md#visiblelayers)*

*Defined in [LayerSettings.ts:50](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/LayerSettings.ts#L50)*

which sublayers are turned on

___

## Methods

<a id="apply"></a>

###  apply

▸ **apply**(operationalLayer: *[LayerListOperationalLayer](../interfaces/layerlistoperationallayer.md)*): `void`

*Defined in [LayerSettings.ts:66](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/LayerSettings.ts#L66)*

Applies the settings to an operational layer.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| operationalLayer | [LayerListOperationalLayer](../interfaces/layerlistoperationallayer.md) |  An operational layer from a layer list. |

**Returns:** `void`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [LayerSettings.ts:96](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/LayerSettings.ts#L96)*

Converts to string for use with URLSearchParams

**Returns:** `string`

___
<a id="parse"></a>

### `<Static>` parse

▸ **parse**(str: *`string`*):  [LayerSettings](layersettings.md) &#124; `null`

*Defined in [LayerSettings.ts:22](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/LayerSettings.ts#L22)*

Converts a string from a URLSearchParams value into a LayerSettings.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  a value from a URLSearchParams. |

**Returns:**  [LayerSettings](layersettings.md) &#124; `null`

___

