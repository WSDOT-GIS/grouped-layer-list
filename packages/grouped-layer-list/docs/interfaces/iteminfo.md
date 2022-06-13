[@wsdot/grouped-layer-list](../README.md) / ItemInfo

# Interface: ItemInfo

Item data retrieved from ArcGIS Online (or other portal).

## Table of contents

### Properties

- [item](ItemInfo.md#item)
- [itemData](ItemInfo.md#itemdata)

## Properties

### item

• **item**: `any`

ArcGIS Online item

**`see`** https://developers.arcgis.com/rest/users-groups-and-items/item.htm

#### Defined in

[packages/grouped-layer-list/src/main.ts:99](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L99)

___

### itemData

• **itemData**: `Object`

ArcGIS Online webmap

**`see`** https://developers.arcgis.com/web-map-specification/

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `applicationProperties?` | [`ApplicationProperties`](ApplicationProperties.md) |
| `operationalLayers` | [`CreateMapOperationalLayer`](CreateMapOperationalLayer.md)[] |

#### Defined in

[packages/grouped-layer-list/src/main.ts:104](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L104)
