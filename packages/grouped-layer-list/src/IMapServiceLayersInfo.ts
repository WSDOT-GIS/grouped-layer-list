export interface ILayersInfoLayer {
    id: number,
    name: string,
    hasMetadata?: boolean
}

export interface IMapServiceLayersInfo {
    layers: ILayersInfoLayer[]
}