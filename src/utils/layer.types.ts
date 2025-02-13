export interface BaseLayerCopmponentProps {
  selectedFeature?: SelectedFeature;
  visibleLayers?: string[];
}

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
