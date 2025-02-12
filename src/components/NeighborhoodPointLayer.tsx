import { Layer, Source } from 'react-map-gl/mapbox';

const sourceId = 'neighbourhood-point';
const layerId = 'neighbourhood-point-id';
const url =
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville_neighbourhoods_points.geojson';
export default function NeighborhoodPointLayer() {
  return (
    <Source
      id={sourceId}
      type='geojson'
      data={url}>
      <Layer
        id={layerId}
        source={sourceId}
        type='circle'
        layout={{ visibility: 'visible' }}
        paint={{
          'circle-radius': 10,
          'circle-color': '#dd3b3b',
          'circle-stroke-color': '#dd3b3b',
          'circle-stroke-width': 2,
          'circle-opacity': 0.5,
        }}
      />
    </Source>
  );
}
