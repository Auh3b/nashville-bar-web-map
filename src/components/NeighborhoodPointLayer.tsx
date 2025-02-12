import { Layer, Source } from 'react-map-gl/mapbox';
import { BaseLayerCopmponentProps } from '../utils/layer.types';

const sourceId = 'neighbourhood-point';
const layerId = 'neighbourhood-point-id';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville_neighbourhoods_points.geojson';
export default function NeighborhoodPointLayer(
  props: BaseLayerCopmponentProps,
) {
  const { selectedFeature, legends } = props;
  return (
    <Source
      id={sourceId}
      type='geojson'
      data={url}>
      <Layer
        id={layerId}
        source={sourceId}
        type='circle'
        layout={{ visibility: legends?.includes(layerId) ? 'visible' : 'none' }}
        paint={{
          'circle-radius': 10,
          'circle-color': '#4b75f2',
          'circle-stroke-color': '#4b75f2',
          'circle-stroke-width': 2,
          'circle-opacity': 0.5,
        }}
      />
      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          type='circle'
          layout={{
            visibility: legends?.includes(layerId) ? 'visible' : 'none',
          }}
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
