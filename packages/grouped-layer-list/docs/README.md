@wsdot/grouped-layer-list

# @wsdot/grouped-layer-list

Exposes GroupLayerList class and related functions.

## Table of contents

### Enumerations

- [MetadataSourceEnum](enums/MetadataSourceEnum.md)

### Classes

- [MetadataOptions](classes/MetadataOptions.md)
- [default](classes/default.md)

### Interfaces

- [ApplicationProperties](interfaces/ApplicationProperties.md)
- [ConfigLayer](interfaces/ConfigLayer.md)
- [ConfigLayerGroups](interfaces/ConfigLayerGroups.md)
- [CreateLayerLinkResult](interfaces/CreateLayerLinkResult.md)
- [CreateMapEvent](interfaces/CreateMapEvent.md)
- [CreateMapOperationalLayer](interfaces/CreateMapOperationalLayer.md)
- [GroupedLayerListOptions](interfaces/GroupedLayerListOptions.md)
- [IMetadataOptions](interfaces/IMetadataOptions.md)
- [ItemInfo](interfaces/ItemInfo.md)
- [LayerGroups](interfaces/LayerGroups.md)
- [LayerListOperationalLayer](interfaces/LayerListOperationalLayer.md)
- [LayerPropGroups](interfaces/LayerPropGroups.md)
- [OperationalLayerCommon](interfaces/OperationalLayerCommon.md)

### Type Aliases

- [MetadataFormat](README.md#metadataformat)
- [MetadataOutput](README.md#metadataoutput)

### Variables

- [defaultFormatterPage](README.md#defaultformatterpage)

### Functions

- [addMetadataTabs](README.md#addmetadatatabs)
- [convertLayer](README.md#convertlayer)
- [createLayerLink](README.md#createlayerlink)
- [fromGeoportalLayers](README.md#fromgeoportallayers)
- [getGroupsFromCreateMapItem](README.md#getgroupsfromcreatemapitem)
- [isSoeMetadataUrl](README.md#issoemetadataurl)
- [setOperationalLayers](README.md#setoperationallayers)

## Type Aliases

### MetadataFormat

Ƭ **MetadataFormat**: ``"fgdc"`` \| ``"iso19139"``

Valid metadata format specifiers.

**`see`** [https://developers.arcgis.com/rest/services-reference/enterprise/metadata.htm#GUID-0F468AF6-56B1-4100-9F2D-CEEE5A61EAA6](https://developers.arcgis.com/rest/services-reference/enterprise/metadata.htm#GUID-0F468AF6-56B1-4100-9F2D-CEEE5A61EAA6)

#### Defined in

[packages/grouped-layer-list/src/types.ts:5](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/types.ts#L5)

___

### MetadataOutput

Ƭ **MetadataOutput**: ``"html"``

Valid metadata format specifiers.

**`see`** [https://developers.arcgis.com/rest/services-reference/enterprise/metadata.htm#GUID-0F468AF6-56B1-4100-9F2D-CEEE5A61EAA6](https://developers.arcgis.com/rest/services-reference/enterprise/metadata.htm#GUID-0F468AF6-56B1-4100-9F2D-CEEE5A61EAA6)

#### Defined in

[packages/grouped-layer-list/src/types.ts:11](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/types.ts#L11)

## Variables

### defaultFormatterPage

• `Const` **defaultFormatterPage**: ``"https://wsdot-gis.github.io/geospatial-metadata"``

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:10](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L10)

## Functions

### addMetadataTabs

▸ **addMetadataTabs**(`layerList`, `options?`): `void`

Adds a "load" event handler to a layer list. When the layer list has loaded,
A metadata tab will be added to each layers list item after its checkbox is
clicked for the first time.

**Must be called before LayerList.startup()!**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerList` | `LayerList` | Layer List dijit |
| `options` | [`IMetadataOptions`](interfaces/IMetadataOptions.md) | - |

#### Returns

`void`

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:156](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L156)

___

### convertLayer

▸ **convertLayer**(`opLayer`): [`LayerListOperationalLayer`](interfaces/LayerListOperationalLayer.md)

Converts the operational layer format returned from arcgis/utils.createMap to the
operation layer format expected by the LayerList constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opLayer` | [`CreateMapOperationalLayer`](interfaces/CreateMapOperationalLayer.md) | Operational layer object from arcgis/utils.createMap complete event. |

#### Returns

[`LayerListOperationalLayer`](interfaces/LayerListOperationalLayer.md)

Operational layer for use with the LayerList constructor.

#### Defined in

[packages/grouped-layer-list/src/main.ts:189](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L189)

___

### createLayerLink

▸ **createLayerLink**(`layerList`): [`CreateLayerLinkResult`](interfaces/CreateLayerLinkResult.md)

Creates a link on the map that will, when clicked, copy the URL of the page with
URL search parameters.

CSS classes of output elements:

 class name           | description
 ------------------   | -----------
.layer-link           | this class will be applied to the div element that contains the link.
.layer-link--copied   | This class will be added to the div after the user has clicked the link and successfully updated the browsers URL via History API. Removed after user changes the state of the map and the URL is updated.
.layer-link--disabled | This class is applied initially to the div and is removed once the user has changed the map in a way that updates the link's URL.
.layer-link__anchor   | this class is applied to the anchor element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerList` | `LayerList` | A layer list control |

#### Returns

[`CreateLayerLinkResult`](interfaces/CreateLayerLinkResult.md)

An object that contains the "root" HTML element control and the event handlers used to update the URL to match the map's state.

#### Defined in

[packages/grouped-layer-list/src/searchUtils.ts:84](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/searchUtils.ts#L84)

___

### fromGeoportalLayers

▸ **fromGeoportalLayers**(`configLayers`): `Object`

Creates operational layers and group definition from GeoPortal config "layers" section.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configLayers` | [`ConfigLayerGroups`](interfaces/ConfigLayerGroups.md) \| [`ConfigLayer`](interfaces/ConfigLayer.md)[] | "layers" value from GeoPortal config. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `groups` | `undefined` \| [`LayerPropGroups`](interfaces/LayerPropGroups.md) |
| `layers` | [`LayerListOperationalLayer`](interfaces/LayerListOperationalLayer.md)[] |

#### Defined in

[packages/grouped-layer-list/src/conversionUtils.ts:60](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/conversionUtils.ts#L60)

___

### getGroupsFromCreateMapItem

▸ **getGroupsFromCreateMapItem**(`itemInfo`): ``null`` \| [`LayerPropGroups`](interfaces/LayerPropGroups.md)

Gets layer group definition (if present) from a web map.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemInfo` | [`ItemInfo`](interfaces/ItemInfo.md) |

#### Returns

``null`` \| [`LayerPropGroups`](interfaces/LayerPropGroups.md)

#### Defined in

[packages/grouped-layer-list/src/main.ts:115](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/main.ts#L115)

___

### isSoeMetadataUrl

▸ **isSoeMetadataUrl**(`url`): `boolean`

Detects if a metadata URL is a WSDOT custom LayerMetadata SOE URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` \| `URL` | metadata URL |

#### Returns

`boolean`

Returns true if URL contains "exts/LayerMetadata", false otherwise.

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:39](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L39)

___

### setOperationalLayers

▸ **setOperationalLayers**(`search`, `opLayers`): `void`

Updates the layers' settings to match those from URL search parameters.
This function should be run on the operational layers **before** they are added
to a LayerList.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search` | `URLSearchParams` | URL search string |
| `opLayers` | [`LayerListOperationalLayer`](interfaces/LayerListOperationalLayer.md)[] | Operational layers |

#### Returns

`void`

#### Defined in

[packages/grouped-layer-list/src/searchUtils.ts:16](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/searchUtils.ts#L16)
