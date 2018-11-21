[@wsdot/grouped-layer-list](../README.md) > [LayerListOperationalLayer](../interfaces/layerlistoperationallayer.md)

# Interface: LayerListOperationalLayer

Defines a map layer for a layer list.

## Hierarchy

 [OperationalLayerCommon](operationallayercommon.md)

**↳ LayerListOperationalLayer**

## Index

### Properties

* [button](layerlistoperationallayer.md#button)
* [content](layerlistoperationallayer.md#content)
* [featureCollection](layerlistoperationallayer.md#featurecollection)
* [id](layerlistoperationallayer.md#id)
* [layer](layerlistoperationallayer.md#layer)
* [showLegend](layerlistoperationallayer.md#showlegend)
* [showOpacitySlider](layerlistoperationallayer.md#showopacityslider)
* [showSubLayers](layerlistoperationallayer.md#showsublayers)
* [title](layerlistoperationallayer.md#title)
* [visibility](layerlistoperationallayer.md#visibility)

---

## Properties

<a id="button"></a>

### `<Optional>` button

**● button**: * `Node` &#124; `string`
*

*Defined in [main.ts:48](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L48)*

Optional Custom button node that will appear within the layer title.

___
<a id="content"></a>

### `<Optional>` content

**● content**: * `Node` &#124; `string`
*

*Defined in [main.ts:50](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L50)*

Optional Custom node to insert the content. It displays below the title.

___
<a id="featurecollection"></a>

### `<Optional>` featureCollection

**● featureCollection**: *`Layer`*

*Defined in [main.ts:52](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L52)*

Required Layer's feature collection. This is required if a layer is not specified.

___
<a id="id"></a>

### `<Optional>` id

**● id**: * `undefined` &#124; `string`
*

*Overrides [OperationalLayerCommon](operationallayercommon.md).[id](operationallayercommon.md#id)*

*Defined in [main.ts:54](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L54)*

Optional The layers id.

___
<a id="layer"></a>

### `<Optional>` layer

**● layer**: *`Layer`*

*Defined in [main.ts:56](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L56)*

Required The layer object. This is required unless using a feature collection.

___
<a id="showlegend"></a>

### `<Optional>` showLegend

**● showLegend**: * `undefined` &#124; `false` &#124; `true`
*

*Defined in [main.ts:58](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L58)*

Optional Indicates whether to display a legend for the layer items.

___
<a id="showopacityslider"></a>

### `<Optional>` showOpacitySlider

**● showOpacitySlider**: * `undefined` &#124; `false` &#124; `true`
*

*Defined in [main.ts:60](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L60)*

Optional Indicates whether to display the opacity slider.

___
<a id="showsublayers"></a>

### `<Optional>` showSubLayers

**● showSubLayers**: * `undefined` &#124; `false` &#124; `true`
*

*Defined in [main.ts:62](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L62)*

Optional Indicates whether to show sublayers for this layer. Prior to version 3.15, this was named sublayers.

___
<a id="title"></a>

### `<Optional>` title

**● title**: * `undefined` &#124; `string`
*

*Inherited from [OperationalLayerCommon](operationallayercommon.md).[title](operationallayercommon.md#title)*

*Defined in [main.ts:21](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L21)*

Optional The title of the layer.

___
<a id="visibility"></a>

### `<Optional>` visibility

**● visibility**: * `undefined` &#124; `false` &#124; `true`
*

*Inherited from [OperationalLayerCommon](operationallayercommon.md).[visibility](operationallayercommon.md#visibility)*

*Defined in [main.ts:23](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L23)*

Optional Indicates whether to set the default visibility.

___

