import { Layer, Source } from 'react-map-gl/mapbox';
import { BaseLayerCopmponentProps } from '../../../utils/layer.types';

const sourceId = 'neighbourhood-poly';
const layerId = 'neighbourhood-layer';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville_neighbourhoods.geojson';

export default function NeigborhoodPolygonLayer(
  props: BaseLayerCopmponentProps,
) {
  const { selectedFeature, visibleLayers } = props;
  return (
    <Source
      id={sourceId}
      type={'geojson'}
      data={url}>
      <Layer
        source={sourceId}
        type={'fill'}
        id={layerId}
        layout={{
          visibility: visibleLayers?.includes(layerId) ? 'visible' : 'none',
        }}
        paint={{
          'fill-color': '#23a667',
          'fill-opacity': 0.5,
        }}
      />
      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          type='fill'
          layout={{
            visibility: visibleLayers?.includes(layerId) ? 'visible' : 'none',
          }}
          filter={[
            '==',
            ['get', selectedFeature.property],
            selectedFeature.value,
          ]}
          paint={{
            'fill-color': '#d63c3c',
            'fill-opacity': 0.5,
          }}
        />
      )}
    </Source>
  );
}
