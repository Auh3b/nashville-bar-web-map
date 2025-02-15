import { Layer, Source } from 'react-map-gl/mapbox';
import { BaseLayerCopmponentProps } from '../../../utils/layer.types';

const sourceId = 'neighbourhood-poly';
const layerId = 'neighbourhood-layer';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville-neighbourhoods-custom.geojson';
const maxzoom = 13;
export default function NeigborhoodPolygonLayer(
  props: BaseLayerCopmponentProps,
) {
  const { selectedFeature, visibleLayers } = props;
  const visibility = visibleLayers?.includes(layerId) ? 'visible' : 'none';
  return (
    <Source
      id={sourceId}
      type={'geojson'}
      data={url}>
      <Layer
        id={layerId}
        source={sourceId}
        maxzoom={maxzoom}
        layout={{
          visibility: visibility,
        }}
        type='fill'
        paint={{ 'fill-color': '#23a667', 'fill-opacity': 0.1 }}
      />
      <Layer
        id={layerId + '_line'}
        source={sourceId}
        maxzoom={maxzoom}
        layout={{
          visibility: visibility,
        }}
        type='line'
        paint={{ 'line-color': '#23a667', 'line-width': 3 }}
      />

      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          maxzoom={maxzoom}
          type='fill'
          layout={{
            visibility: visibility,
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
      {selectedFeature && (
        <Layer
          id={layerId + 'selected_line'}
          source={sourceId}
          maxzoom={maxzoom}
          type='line'
          layout={{
            visibility: visibility,
          }}
          filter={[
            '==',
            ['get', selectedFeature.property],
            selectedFeature.value,
          ]}
          paint={{
            'line-color': '#d63c3c',
            'line-width': 3,
          }}
        />
      )}
      <Layer
        id={layerId + '_text'}
        source={sourceId}
        maxzoom={maxzoom}
        layout={{
          visibility: visibility,
          'text-field': ['get', 'name'],
        }}
        type='symbol'
      />
    </Source>
  );
}
