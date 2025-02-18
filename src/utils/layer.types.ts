export interface BaseLayerCopmponentProps {}

export interface SelectedFeature {
  property: string;
  value: unknown;
}

export interface SelectedFeatures {
  [k: string]: {
    property: string;
    value: unknown;
  };
}
