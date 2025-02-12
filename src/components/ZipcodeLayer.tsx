import { Layer, Source } from 'react-map-gl/mapbox';
import { BaseLayerCopmponentProps } from '../utils/layer.types';

const sourceId = 'zipcode-source';
const layerId = 'zipcode-layer';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville_zipcode_refined.json';

export default function ZipcodeLayer(props: BaseLayerCopmponentProps) {
  const { selectedFeature } = props;
  console.log(selectedFeature);
  return (
    <Source
      type='geojson'
      id={sourceId}
      data={url}>
      <Layer
        id={layerId}
        source={sourceId}
        type='fill'
        paint={{ 'fill-color': '#f5c064', 'fill-opacity': 0.5 }}
      />

      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          type='fill'
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
