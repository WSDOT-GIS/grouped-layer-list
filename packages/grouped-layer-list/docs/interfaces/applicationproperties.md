[@wsdot/grouped-layer-list](../README.md) / ApplicationProperties

# Interface: ApplicationProperties

Application properties section of an ArcGIS Online webmap.

**`see`** https://developers.arcgis.com/web-map-specification/objects/applicationProperties/

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [viewing](ApplicationProperties.md#viewing)

## Properties

### viewing

• **viewing**: `Object`

properties related to viewing (as opposed to editing, etc.)

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerGrouping?` | { `enabled`: `boolean` ; `groups`: [`LayerPropGroups`](LayerPropGroups.md)  } | layer grouping property created for use with the GroupedLayerList. This is not part of Esri's standard |
| `layerGrouping.enabled` | `boolean` | - |
| `layerGrouping.groups` | [`LayerPropGroups`](LayerPropGroups.md) | - |

#### Defined in

[packages/grouped-layer-list/src/main.ts:78](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L78)
