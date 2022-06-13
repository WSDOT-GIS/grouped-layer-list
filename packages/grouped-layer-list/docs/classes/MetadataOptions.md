[@wsdot/grouped-layer-list](../README.md) / MetadataOptions

# Class: MetadataOptions

## Implements

- [`IMetadataOptions`](../interfaces/IMetadataOptions.md)

## Table of contents

### Constructors

- [constructor](MetadataOptions.md#constructor)

### Properties

- [format](MetadataOptions.md#format)
- [formatterPageUrl](MetadataOptions.md#formatterpageurl)
- [output](MetadataOptions.md#output)
- [whatToFormat](MetadataOptions.md#whattoformat)

### Methods

- [wrapMetadataUrl](MetadataOptions.md#wrapmetadataurl)

## Constructors

### constructor

• **new MetadataOptions**(`options`)

Creates a new instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IMetadataOptions`](../interfaces/IMetadataOptions.md) | options |

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:135](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L135)

## Properties

### format

• `Optional` **format**: [`MetadataFormat`](../README.md#metadataformat)

Metadata format

#### Implementation of

[IMetadataOptions](../interfaces/IMetadataOptions.md).[format](../interfaces/IMetadataOptions.md#format)

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:126](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L126)

___

### formatterPageUrl

• `Optional` **formatterPageUrl**: `string`

formatter page URL

#### Implementation of

[IMetadataOptions](../interfaces/IMetadataOptions.md).[formatterPageUrl](../interfaces/IMetadataOptions.md#formatterpageurl)

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:128](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L128)

___

### output

• `Optional` **output**: ``"html"``

Metadata output

#### Implementation of

[IMetadataOptions](../interfaces/IMetadataOptions.md).[output](../interfaces/IMetadataOptions.md#output)

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:127](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L127)

___

### whatToFormat

• `Optional` **whatToFormat**: [`MetadataSourceEnum`](../enums/MetadataSourceEnum.md)

what to format

#### Implementation of

[IMetadataOptions](../interfaces/IMetadataOptions.md).[whatToFormat](../interfaces/IMetadataOptions.md#whattoformat)

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:129](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L129)

## Methods

### wrapMetadataUrl

▸ **wrapMetadataUrl**(`url`): `URL`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` \| `URL` |

#### Returns

`URL`

#### Defined in

[packages/grouped-layer-list/src/metadataUtils.ts:142](https://github.com/WSDOT-GIS/grouped-layer-list/blob/c240d2b/packages/grouped-layer-list/src/metadataUtils.ts#L142)
