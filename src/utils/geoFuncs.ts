import { bbox, feature, featureCollection } from '@turf/turf';
import { Feature, FeatureCollection } from 'geojson';
// import { parse } from '@loaders.gl/core';
// import { WKBLoader } from '@loaders.gl/wkt';
import { parse } from 'wellknown';

export function getBounds(feature: Feature | FeatureCollection) {
  const [minX, minY, maxX, maxY] = bbox(feature);
  const bounds = [
    [minX, minY],
    [maxX, maxY],
  ];
  return bounds;
}

type PostType = 'point' | 'polygon';

function getFeatureGenerator() {
  return feature;
}

function getWKTReader() {
  return parse;
}
export async function postsTofeatureCollection(posts: any[]) {
  let features: Feature[] = [];
  const featureGenerator = getFeatureGenerator();
  const wkt = getWKTReader();

  for (let i = 0; i < posts.length; i++) {
    const { meta, ...rest } = posts[i];
    const { geometry } = meta;

    const geom = wkt(geometry);
    const feature = featureGenerator(geom, { ...meta, wp: rest });

    features = [...features, feature];
  }
  const collection = featureCollection(features);
  return collection;
}
