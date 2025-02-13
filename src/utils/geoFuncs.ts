import { bbox } from '@turf/turf';
import { Feature, FeatureCollection } from 'geojson';

export function getBounds(feature: Feature | FeatureCollection) {
  const [minX, minY, maxX, maxY] = bbox(feature);
  const bounds = [
    [minX, minY],
    [maxX, maxY],
  ];
  return bounds;
}
