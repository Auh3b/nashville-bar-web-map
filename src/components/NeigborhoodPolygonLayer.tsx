import { Layer, Source } from 'react-map-gl/mapbox';
import { BaseLayerCopmponentProps } from '../utils/layer.types';

const sourceId = 'neighbourhood-poly';
const layerId = 'neighbourhood-layer';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville_neighbourhoods.geojson';

export default function NeigborhoodPolygonLayer(
  props: BaseLayerCopmponentProps,
) {
  const { selectedFeature } = props;
  return (
    <Source
      id={sourceId}
      type={'geojson'}
      data={url}>
      <Layer
        source={sourceId}
        type={'fill'}
        id={layerId}
        paint={{
          'fill-color': '#23a667',
          'fill-opacity': 0.5,
        }}
      />
      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          type='circle'
          filter={[
            '==',
            ['get', selectedFeature.property],
            selectedFeature.value,
          ]}
          paint={{
            'circle-radius': 10,
            'circle-color': '#d63c3c',
            'circle-stroke-color': '#d63c3c',
            'circle-stroke-width': 2,
            'circle-opacity': 0.5,
          }}
        />
      )}
    </Source>
  );
}
