import { Layer, Source } from 'react-map-gl/mapbox';
import useData from '../../../hooks/useData';
import { Fragment } from 'react';
import useMapStore from '../../../data/mapStore';

const sourceId = 'neighbourhood-poly';
const layerId = 'neighbourhood-layer';
const maxzoom = 13;
const color = '#9b3f69';
export default function NeigborhoodPolygonLayer() {
  const hoods = useData('hoods');
  const selectedHood = useMapStore((state) => state.hood);
  return (
    <Fragment>
      {hoods && (
        <Source
          id={sourceId}
          type={'geojson'}
          data={hoods}>
          <Layer
            id={layerId}
            source={sourceId}
            maxzoom={maxzoom}
            layout={{}}
            type='fill'
            paint={{ 'fill-color': color, 'fill-opacity': 0.1 }}
          />
          <Layer
            id={layerId + '_line'}
            source={sourceId}
            maxzoom={maxzoom}
            layout={{}}
            type='line'
            paint={{ 'line-color': color, 'line-width': 3 }}
          />

          {selectedHood && (
            <Layer
              id={layerId + 'selected'}
              source={sourceId}
              maxzoom={maxzoom}
              type='fill'
              layout={{}}
              filter={['==', ['get', 'id'], selectedHood?.id]}
              paint={{
                'fill-color': '#d63c3c',
                'fill-opacity': 0.5,
              }}
            />
          )}
          {selectedHood && (
            <Layer
              id={layerId + 'selected_line'}
              source={sourceId}
              maxzoom={maxzoom}
              type='line'
              layout={{}}
              filter={['==', ['get', 'id'], selectedHood?.id]}
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
              'text-field': ['get', 'name'],
              'text-transform': 'uppercase',
            }}
            paint={{
              'text-color': 'white',
              'text-halo-width': 1,
              'text-halo-color': color,
              'text-opacity': 1,
            }}
            type='symbol'
          />
        </Source>
      )}
    </Fragment>
  );
}
