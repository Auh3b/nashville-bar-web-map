import { Fragment, useEffect } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/mapbox';
import useData from '../../../hooks/useData';
import useMapStore from '../../../data/mapStore';

const sourceId = 'bars';
const layerId = 'bars-layer';
const barIconUrl =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/beer-1-sdf.png';

const minzoom = 13;
const color = '#e6bb32';
const textHaloColor = '#c1832d';
const iconName = 'bar-glass-icon';
const selectedColor = '#da100d';

export default function BarsLayer() {
  const mapRef = useMap();
  const bars = useData('bars');
  const { bar: selectedBar } = useMapStore((state) => state);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.loadImage(barIconUrl, (error, image) => {
        if (error) throw error;
        if (!mapRef?.current?.hasImage(iconName)) {
          // @ts-expect-error
          mapRef.current.addImage(iconName, image, { sdf: true });
        }
      });
    }
  }, [mapRef.current]);

  return (
    <Fragment>
      {bars && (
        <Source
          id={sourceId}
          type={'geojson'}
          data={bars}
          cluster={true}
          clusterMaxZoom={17}
          clusterRadius={50}>
          <Layer
            id={layerId + '_cluster'}
            type='circle'
            source={sourceId}
            minzoom={minzoom}
            filter={['has', 'point_count']}
            paint={{
              'circle-color': color,
              'circle-radius': ['*', ['get', 'point_count'], 10],
              'circle-opacity': 0.75,
              'circle-stroke-width': 3,
              'circle-stroke-color': color,
            }}
          />
          <Layer
            id={layerId + '_cluster_text'}
            type='symbol'
            source={sourceId}
            minzoom={minzoom}
            filter={['has', 'point_count']}
            layout={{
              'text-field': ['get', 'point_count'],
              'text-size': 24,
            }}
            paint={{
              'text-color': 'white',
            }}
          />
          <Layer
            id={layerId + '_text'}
            source={sourceId}
            minzoom={minzoom}
            layout={{
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
          {selectedBar && (
            <Layer
              id={layerId + '_selected' + '_text'}
              source={sourceId}
              minzoom={minzoom}
              layout={{
                'text-field': ['get', 'name'],
                'text-anchor': 'top',
                'text-transform': 'uppercase',
                'text-offset': [0, 3],
                'text-size': 10,
              }}
              filter={['==', ['get', 'id'], selectedBar?.id]}
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
            }}
            filter={['!', ['has', 'point_count']]}
            minzoom={minzoom}
            type='symbol'
            paint={{
              'icon-color': color,
            }}
          />

          {selectedBar && (
            <Layer
              id={layerId + 'selected'}
              source={sourceId}
              type='symbol'
              minzoom={minzoom}
              layout={{
                'icon-image': iconName,
                'icon-size': 0.1,
              }}
              filter={['==', ['get', 'id'], selectedBar?.id]}
              paint={{ 'icon-color': selectedColor }}
            />
          )}
        </Source>
      )}
    </Fragment>
  );
}
