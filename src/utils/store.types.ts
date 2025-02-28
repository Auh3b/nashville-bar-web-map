import {
  FeatureCollection,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
interface PreviewItem {
  [l: string]: any;
}

export interface Preview {
  hood?: PreviewItem;
  bar?: PreviewItem;
}

export interface HoodItem extends HoodsItemProperty {
  bounds: number[][];
}

export type BarItem = BarsItemProperty;

export interface BarsItemProperty {
  id: string;
  name: string;
  address: string;
  description: string;
  igWidgetId: string;
  primary: string;
  secondary?: string;
  zipcode: number;
  latitude: number;
  longitude: number;
  hoodname: string;
}

export type Bars = FeatureCollection<MultiPolygon | Polygon, BarsItemProperty>;

export interface HoodsItemProperty {
  id: string;
  name: string;
}

export type Hoods = FeatureCollection<Point | MultiPoint, HoodsItemProperty>;

export interface DataSets {
  bars: Bars;
  hoods: Hoods;
}

export interface Category {
  value: string;
  checked: boolean;
  label: string;
  subs?: Categories;
}

export interface Categories {
  [k: string]: Category;
}
