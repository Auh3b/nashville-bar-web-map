import { useEffect } from 'react';
import { BaseLayerCopmponentProps } from '../../../utils/layer.types';
import { Layer, Source, useMap } from 'react-map-gl/mapbox';

const sourceId = 'bars';
const layerId = 'bars-layer';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville-bars-data.geojson';

const barIconUrl =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/beer-1-sdf.png';

const minzoom = 13;
const color = '#e6bb32';
const textHaloColor = '#c1832d';
const iconName = 'bar-glass-icon';
const selectedColor = '#da100d';
export default function BarsLayer(
  props: BaseLayerCopmponentProps & { explore?: string },
) {
  const { selectedFeature, visibleLayers, explore = '' } = props;
  const visibility = visibleLayers?.includes(layerId) ? 'visible' : 'none';
  const mapRef = useMap();
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.loadImage(barIconUrl, (error, image) => {
        if (error) throw error;
        if (!mapRef?.current?.hasImage(iconName)) {
          // @ts-expect-error
          mapRef.current.addImage(iconName, image, { sdf: true });
          console.log('added');
        }
      });
    }
  }, [mapRef.current]);
  return (
    <Source
      id={sourceId}
      type={'geojson'}
      data={url}>
      <Layer
        id={layerId + '_cluster'}
        type='circle'
        source={sourceId}
        filter={['has', 'point_count']}
        paint={{
          'circle-color': color,
          'circle-radius': ['step', ['get', 'point_count'], 5, 5, 10, 10, 20],
        }}
      />
      <Layer
        id={layerId + '_text'}
        source={sourceId}
        filter={['==', ['get', 'hood'], explore]}
        minzoom={minzoom}
        layout={{
          visibility: visibility,
          'text-field': ['get', 'name'],
          'text-anchor': 'top',
          'text-transform': 'uppercase',
          'text-offset': [0, 3],
          'text-size': 10,
        }}
        paint={{
          'text-color': 'white',
          'text-halo-width': 1,
          'text-halo-color': textHaloColor,
        }}
        type='symbol'
      />
      {selectedFeature && (
        <Layer
          id={layerId + '_selected' + '_text'}
          source={sourceId}
          minzoom={minzoom}
          layout={{
            visibility: visibility,
            'text-field': ['get', 'name'],
            'text-anchor': 'top',
            'text-transform': 'uppercase',
            'text-offset': [0, 3],
            'text-size': 10,
          }}
          filter={[
            'all',
            ['==', ['get', selectedFeature.property], selectedFeature.value],
            ['==', ['get', 'hood'], explore],
          ]}
          paint={{
            'text-color': 'white',
            'text-halo-width': 1,
            'text-halo-color': selectedColor,
          }}
          type='symbol'
        />
      )}
      <Layer
        id={layerId}
        source={sourceId}
        layout={{
          'icon-image': iconName,
          'icon-size': 0.1,
          visibility: visibility,
        }}
        minzoom={minzoom}
        filter={['==', ['get', 'hood'], explore]}
        type='symbol'
        paint={{
          'icon-color': color,
        }}
      />

      {selectedFeature && (
        <Layer
          id={layerId + 'selected'}
          source={sourceId}
          type='symbol'
          minzoom={minzoom}
          layout={{
            'icon-image': iconName,
            'icon-size': 0.1,
            visibility: visibility,
          }}
          filter={[
            'all',
            ['==', ['get', selectedFeature.property], selectedFeature.value],
            ['==', ['get', 'hood'], explore],
          ]}
          paint={{ 'icon-color': selectedColor }}
        />
      )}
    </Source>
  );
}
