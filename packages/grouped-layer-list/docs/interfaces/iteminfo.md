[@wsdot/grouped-layer-list](../README.md) > [ItemInfo](../interfaces/iteminfo.md)

# Interface: ItemInfo

Item data retrieved from ArcGIS Online (or other portal).

## Hierarchy

**ItemInfo**

## Index

### Properties

* [item](iteminfo.md#item)
* [itemData](iteminfo.md#itemdata)

---

## Properties

<a id="item"></a>

###  item

**● item**: *`any`*

*Defined in [main.ts:93](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L93)*

ArcGIS Online item
*__see__*: [https://developers.arcgis.com/rest/users-groups-and-items/item.htm](https://developers.arcgis.com/rest/users-groups-and-items/item.htm)

___
<a id="itemdata"></a>

###  itemData

**● itemData**: *`object`*

*Defined in [main.ts:98](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L98)*

ArcGIS Online webmap
*__see__*: [https://developers.arcgis.com/web-map-specification/](https://developers.arcgis.com/web-map-specification/)

#### Type declaration

[key: `string`]: `any`

`Optional`  applicationProperties: [ApplicationProperties](applicationproperties.md)

 operationalLayers: [CreateMapOperationalLayer](createmapoperationallayer.md)[]

___

