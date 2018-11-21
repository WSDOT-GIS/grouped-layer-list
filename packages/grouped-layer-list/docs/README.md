
#  @wsdot/grouped-layer-list

## Index

### Classes

* [GroupedLayerList](classes/groupedlayerlist.md)

### Interfaces

* [ApplicationProperties](interfaces/applicationproperties.md)
* [CreateMapEvent](interfaces/createmapevent.md)
* [CreateMapOperationalLayer](interfaces/createmapoperationallayer.md)
* [GroupedLayerListOptions](interfaces/groupedlayerlistoptions.md)
* [ItemInfo](interfaces/iteminfo.md)
* [LayerGroups](interfaces/layergroups.md)
* [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)
* [LayerPropGroups](interfaces/layerpropgroups.md)
* [OperationalLayerCommon](interfaces/operationallayercommon.md)

### Variables

* [defaultFormatterPage](#defaultformatterpage)

### Functions

* [addGroupHeadings](#addgroupheadings)
* [addMetadataTab](#addmetadatatab)
* [addMetadataTabs](#addmetadatatabs)
* [convertLayer](#convertlayer)
* [createTitleToGroupMapping](#createtitletogroupmapping)
* [enumerateLayersInGroupOrder](#enumeratelayersingrouporder)
* [getGroupsFromCreateMapItem](#getgroupsfromcreatemapitem)
* [getTabContainerFromCheckbox](#gettabcontainerfromcheckbox)
* [wrapUrlWithFormatterPage](#wrapurlwithformatterpage)

---

## Variables

<a id="defaultformatterpage"></a>

### `<Const>` defaultFormatterPage

**● defaultFormatterPage**: *"https://wsdot-gis.github.io/geospatial-metadata"* = "https://wsdot-gis.github.io/geospatial-metadata"

*Defined in [metadataUtils.ts:8](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/metadataUtils.ts#L8)*

___

## Functions

<a id="addgroupheadings"></a>

###  addGroupHeadings

▸ **addGroupHeadings**(srcNode: * `Node` &#124; `string`*, groups: *[LayerPropGroups](interfaces/layerpropgroups.md)*): `string`

*Defined in [main.ts:265](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L265)*

Adds group headings above the list item corresponding to the first layer in a group.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| srcNode |  `Node` &#124; `string`|  the srcNode of a LayerList |
| groups | [LayerPropGroups](interfaces/layerpropgroups.md) |  Defines which layers are in which group. |

**Returns:** `string`
CSS text to be added to a style element to be added to the page head.

___
<a id="addmetadatatab"></a>

###  addMetadataTab

▸ **addMetadataTab**(tabContainer: *`Element`*, operationalLayer: *[LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)*, layerIndex: *`number`*, formatterPageUrl: *`string`*): `Promise`<`void`>

*Defined in [metadataUtils.ts:110](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/metadataUtils.ts#L110)*

Adds the metadata tab to a layer's tab container after checking to see if the layer in question supports the LayerMetadata SOE.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tabContainer | `Element` |  \- |
| operationalLayer | [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md) |  \- |
| layerIndex | `number` |  \- |
| formatterPageUrl | `string` |   |

**Returns:** `Promise`<`void`>

___
<a id="addmetadatatabs"></a>

###  addMetadataTabs

▸ **addMetadataTabs**(layerList: *`LayerList`*, formatterPageUrl?: *`string`*): `void`

*Defined in [metadataUtils.ts:37](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/metadataUtils.ts#L37)*

Adds a "load" event handler to a layer list. When the layer list has loaded, A metadata tab will be added to each layers list item after its checkbox is clicked for the first time.

**Must be called before LayerList.startup()!**

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| layerList | `LayerList` | - |  Layer List dijit |
| `Default value` formatterPageUrl | `string` |  defaultFormatterPage |  URL of formatter page. |

**Returns:** `void`

___
<a id="convertlayer"></a>

###  convertLayer

▸ **convertLayer**(opLayer: *[CreateMapOperationalLayer](interfaces/createmapoperationallayer.md)*): [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)

*Defined in [main.ts:183](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L183)*

Converts the operational layer format returned from arcgis/utils.createMap to the operation layer format expected by the LayerList constructor.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| opLayer | [CreateMapOperationalLayer](interfaces/createmapoperationallayer.md) |  Operational layer object from arcgis/utils.createMap complete event. |

**Returns:** [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)
Operational layer for use with the LayerList constructor.

___
<a id="createtitletogroupmapping"></a>

###  createTitleToGroupMapping

▸ **createTitleToGroupMapping**(groups: *[LayerPropGroups](interfaces/layerpropgroups.md)*): `Map`<`string`, `string`>

*Defined in [main.ts:247](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L247)*

Creates a mapping of layer titles to group names.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| groups | [LayerPropGroups](interfaces/layerpropgroups.md) |  group definition object. |

**Returns:** `Map`<`string`, `string`>

___
<a id="enumeratelayersingrouporder"></a>

###  enumerateLayersInGroupOrder

▸ **enumerateLayersInGroupOrder**(titleGroups: *[LayerPropGroups](interfaces/layerpropgroups.md)*, layers: *[LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)[]*, propertyName?: *`string`*, throwOnValueNotFound?: * `undefined` &#124; `false` &#124; `true`*): `IterableIterator`<[LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)>

*Defined in [main.ts:217](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L217)*

Enumerate through the layers in the order presented in the grouping object.
*__throws__*: ReferenceError thrown if titleGroups contains a value that has no corresponding layer when throwOnValueNotFound is true.

*__yields__*: {LayerListOperationalLayer}

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| titleGroups | [LayerPropGroups](interfaces/layerpropgroups.md) | - |  Grouping of layers |
| layers | [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)[] | - |  Array of layers |
| `Default value` propertyName | `string` | &quot;id&quot; |  The name of the property. (Defaults to "id") |
| `Optional` throwOnValueNotFound |  `undefined` &#124; `false` &#124; `true`| - |  Set to true to throw a ReferenceError if a group has a value that has no matching layer. If set to false, the invalid value will simply be ignored. |

**Returns:** `IterableIterator`<[LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)>

___
<a id="getgroupsfromcreatemapitem"></a>

###  getGroupsFromCreateMapItem

▸ **getGroupsFromCreateMapItem**(itemInfo: *[ItemInfo](interfaces/iteminfo.md)*):  `null` &#124; [LayerPropGroups](interfaces/layerpropgroups.md)

*Defined in [main.ts:109](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/main.ts#L109)*

Gets layer group definition (if present) from a web map.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| itemInfo | [ItemInfo](interfaces/iteminfo.md) |   |

**Returns:**  `null` &#124; [LayerPropGroups](interfaces/layerpropgroups.md)

___
<a id="gettabcontainerfromcheckbox"></a>

###  getTabContainerFromCheckbox

▸ **getTabContainerFromCheckbox**(checkbox: *`HTMLInputElement`*): `Element`

*Defined in [metadataUtils.ts:96](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/metadataUtils.ts#L96)*

Gets the tab container for the layer corresponding to the given checkbox

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| checkbox | `HTMLInputElement` |  A checkbox input element. |

**Returns:** `Element`

___
<a id="wrapurlwithformatterpage"></a>

###  wrapUrlWithFormatterPage

▸ **wrapUrlWithFormatterPage**(metadataUrl: *`string`*, formatterPageUrl?: *`string`*): `string`

*Defined in [metadataUtils.ts:15](https://github.com/WSDOT-GIS/grouped-layer-list/blob/7ac8b6c/packages/grouped-layer-list/src/metadataUtils.ts#L15)*

Creates a URL for a page that formats a metadata URL's XML into HTML.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| metadataUrl | `string` | - |  Metadata URL. |
| `Default value` formatterPageUrl | `string` |  defaultFormatterPage |  Formatter page URL. |

**Returns:** `string`

___

