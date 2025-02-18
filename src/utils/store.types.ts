interface PreviewItem {
  [l: string]: any;
}

export interface Preview {
  hood?: PreviewItem;
  bar?: PreviewItem;
}

export interface LocationItem {
  id?: string;
  name?: string;
  description?: string;
}

export interface HoodItem extends LocationItem {
  preview?: Preview;
  selectedHood?: string;
}

export interface BarItem extends LocationItem {
  preview?: Preview;
  bar?: string;
  hood?: string;
}
