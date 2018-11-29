[@wsdot/grouped-layer-list](../README.md) > [ApplicationProperties](../interfaces/applicationproperties.md)

# Interface: ApplicationProperties

Application properties section of an ArcGIS Online webmap.
*__see__*: [https://developers.arcgis.com/web-map-specification/objects/applicationProperties/](https://developers.arcgis.com/web-map-specification/objects/applicationProperties/)

## Hierarchy

**ApplicationProperties**

## Indexable

\[key: `string`\]:&nbsp;`any`
Application properties section of an ArcGIS Online webmap.

## Index

### Properties

* [viewing](applicationproperties.md#viewing)

---

## Properties

<a id="viewing"></a>

###  viewing

**● viewing**: *`object`*

*Defined in [main.ts:72](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c2b0772/packages/grouped-layer-list/src/main.ts#L72)*

properties related to viewing (as opposed to editing, etc.)

#### Type declaration

[key: `string`]: `any`

`Optional`  layerGrouping:  `undefined` &#124; `object`

layer grouping property created for use with the GroupedLayerList. This is not part of Esri's standard

___

