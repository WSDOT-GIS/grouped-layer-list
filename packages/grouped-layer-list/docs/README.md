
#  @wsdot/grouped-layer-list

## Index

### Classes

* [GroupedLayerList](classes/groupedlayerlist.md)
* [LayerSettings](classes/layersettings.md)

### Interfaces

* [ApplicationProperties](interfaces/applicationproperties.md)
* [CreateMapEvent](interfaces/createmapevent.md)
* [CreateMapOperationalLayer](interfaces/createmapoperationallayer.md)
* [GroupedLayerListOptions](interfaces/groupedlayerlistoptions.md)
* [ILayerSettings](interfaces/ilayersettings.md)
* [ItemInfo](interfaces/iteminfo.md)
* [LayerGroups](interfaces/layergroups.md)
* [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)
* [LayerPropGroups](interfaces/layerpropgroups.md)
* [OperationalLayerCommon](interfaces/operationallayercommon.md)

### Variables

* [defaultFormatterPage](#defaultformatterpage)
* [falseStrings](#falsestrings)
* [trueStrings](#truestrings)

### Functions

* [addGroupHeadings](#addgroupheadings)
* [addMetadataTab](#addmetadatatab)
* [addMetadataTabs](#addmetadatatabs)
* [convertLayer](#convertlayer)
* [createLayerLink](#createlayerlink)
* [createTitleToGroupMapping](#createtitletogroupmapping)
* [enumerateLayersInGroupOrder](#enumeratelayersingrouporder)
* [getGroupsFromCreateMapItem](#getgroupsfromcreatemapitem)
* [getTabContainerFromCheckbox](#gettabcontainerfromcheckbox)
* [makeBooleanRe](#makebooleanre)
* [makeReGroup](#makeregroup)
* [setOperationalLayers](#setoperationallayers)
* [wrapUrlWithFormatterPage](#wrapurlwithformatterpage)

---

## Variables

<a id="defaultformatterpage"></a>

### `<Const>` defaultFormatterPage

**● defaultFormatterPage**: *"https://wsdot-gis.github.io/geospatial-metadata"* = "https://wsdot-gis.github.io/geospatial-metadata"

*Defined in [metadataUtils.ts:8](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/metadataUtils.ts#L8)*

___
<a id="falsestrings"></a>

### `<Const>` falseStrings

**● falseStrings**: *`string`[]* =  ["false", "off", "⍻", "X"]

*Defined in [reUtils.ts:2](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/reUtils.ts#L2)*

___
<a id="truestrings"></a>

### `<Const>` trueStrings

**● trueStrings**: *`string`[]* =  ["true", "on", "✓", "✔", "🗸", "🗹", "☑", "✅"]

*Defined in [reUtils.ts:1](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/reUtils.ts#L1)*

___

## Functions

<a id="addgroupheadings"></a>

###  addGroupHeadings

▸ **addGroupHeadings**(srcNode: * `Node` &#124; `string`*, groups: *[LayerPropGroups](interfaces/layerpropgroups.md)*): `string`

*Defined in [main.ts:267](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/main.ts#L267)*

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

*Defined in [metadataUtils.ts:110](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/metadataUtils.ts#L110)*

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

*Defined in [metadataUtils.ts:37](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/metadataUtils.ts#L37)*

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

*Defined in [main.ts:185](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/main.ts#L185)*

Converts the operational layer format returned from arcgis/utils.createMap to the operation layer format expected by the LayerList constructor.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| opLayer | [CreateMapOperationalLayer](interfaces/createmapoperationallayer.md) |  Operational layer object from arcgis/utils.createMap complete event. |

**Returns:** [LayerListOperationalLayer](interfaces/layerlistoperationallayer.md)
Operational layer for use with the LayerList constructor.

___
<a id="createlayerlink"></a>

###  createLayerLink

▸ **createLayerLink**(layerList: *`LayerList`*): `void`

*Defined in [searchUtils.ts:53](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/searchUtils.ts#L53)*

Creates a link on the map that will, when clicked, copy the URL of the page with URL search parameters

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| layerList | `LayerList` |   |

**Returns:** `void`

___
<a id="createtitletogroupmapping"></a>

###  createTitleToGroupMapping

▸ **createTitleToGroupMapping**(groups: *[LayerPropGroups](interfaces/layerpropgroups.md)*): `Map`<`string`, `string`>

*Defined in [main.ts:249](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/main.ts#L249)*

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

*Defined in [main.ts:219](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/main.ts#L219)*

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

*Defined in [main.ts:111](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/main.ts#L111)*

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

*Defined in [metadataUtils.ts:96](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/metadataUtils.ts#L96)*

Gets the tab container for the layer corresponding to the given checkbox

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| checkbox | `HTMLInputElement` |  A checkbox input element. |

**Returns:** `Element`

___
<a id="makebooleanre"></a>

###  makeBooleanRe

▸ **makeBooleanRe**(matchOnly?: * `boolean` &#124; `null`*, exclusive?: * `undefined` &#124; `false` &#124; `true`*): `RegExp`

*Defined in [reUtils.ts:32](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/reUtils.ts#L32)*

Creates a RegExp that will match boolean values.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` matchOnly |  `boolean` &#124; `null`|  Set to true to only match true value strings. Set to false to only match false value strings. Set to non-boolean (e.g., undefined or null) to match either true or false. |
| `Optional` exclusive |  `undefined` &#124; `false` &#124; `true`|   |

**Returns:** `RegExp`

___
<a id="makeregroup"></a>

###  makeReGroup

▸ **makeReGroup**(strings: *`string`[]*, exclusive?: * `undefined` &#124; `false` &#124; `true`*): `RegExp`

*Defined in [reUtils.ts:17](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/reUtils.ts#L17)*

Creates a regular expression that will match if tested against a string containing any of the strings in the input array.
*__example__*: const trueStrings = \["true", "on", "1", "✓", "✔", "🗸", "🗹", "☑", "✅"\]; const falseStrings = \["false", "off", "0", "⍻", "X"\]; const trueRe = makeReGroup(trueStrings); // /(?:true)|(?:on)|(?:1)|(?:✓)|(?:✔)|(?:🗸)|(?:🗹)|(?:☑)|(?:✅)/ const falseRe = makeReGroup(falseStrings); // /(?:false)|(?:off)|(?:0)|(?:⍻)|(?:X)/

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| strings | `string`[] |  An array of strings |
| `Optional` exclusive |  `undefined` &#124; `false` &#124; `true`|  Set to true to start regex with "^" and end with "$", false (or omit) otherwise. |

**Returns:** `RegExp`

___
<a id="setoperationallayers"></a>

###  setOperationalLayers

▸ **setOperationalLayers**(search: *`URLSearchParams`*, layerList: *`LayerList`*): `void`

*Defined in [searchUtils.ts:12](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/searchUtils.ts#L12)*

Updates the layers' settings to match those from URL search parameters.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| search | `URLSearchParams` |  URL search string |
| layerList | `LayerList` |

**Returns:** `void`

___
<a id="wrapurlwithformatterpage"></a>

###  wrapUrlWithFormatterPage

▸ **wrapUrlWithFormatterPage**(metadataUrl: *`string`*, formatterPageUrl?: *`string`*): `string`

*Defined in [metadataUtils.ts:15](https://github.com/WSDOT-GIS/grouped-layer-list/blob/0b4c79f/packages/grouped-layer-list/src/metadataUtils.ts#L15)*

Creates a URL for a page that formats a metadata URL's XML into HTML.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| metadataUrl | `string` | - |  Metadata URL. |
| `Default value` formatterPageUrl | `string` |  defaultFormatterPage |  Formatter page URL. |

**Returns:** `string`

___

