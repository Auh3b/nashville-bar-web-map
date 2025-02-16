import { BaseLayerCopmponentProps } from '../../../utils/layer.types';
import { Layer, Source } from 'react-map-gl/mapbox';

const sourceId = 'bars';
const layerId = 'bars-layer';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville-bars-data.geojson';

const minzoom = 13;
export default function BarsLayer(
  props: BaseLayerCopmponentProps & { explore?: string },
) {
  const { selectedFeature, visibleLayers, explore = '' } = props;
  const visibility = visibleLayers?.includes(layerId) ? 'visible' : 'none';
  return (
    <Source
      id={sourceId}
      type={'geojson'}
      data={url}>
      <Layer
        id={layerId}
        source={sourceId}
        layout={{
          visibility: visibility,
        }}
        minzoom={minzoom}
        filter={['==', ['get', 'hood'], explore]}
        type='circle'
        paint={{
          'circle-color': '#4b75f2',
          'circle-opacity': 0.5,
          'circle-radius': 5,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#4b75f2',
        }}
      />

      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          type='circle'
          minzoom={minzoom}
          layout={{
            visibility: visibility,
          }}
          filter={[
            '==',
            ['get', selectedFeature.property],
            selectedFeature.value,
          ]}
          paint={{
            'circle-color': '#d63c3c',
            'circle-opacity': 0.5,
            'circle-radius': 5,
          }}
        />
      )}

      <Layer
        id={layerId + '_text'}
        source={sourceId}
        filter={['==', ['get', 'hood'], explore]}
        minzoom={minzoom}
        layout={{
          visibility: visibility,
          'text-field': ['get', 'name'],
        }}
        type='symbol'
      />
    </Source>
  );
}
