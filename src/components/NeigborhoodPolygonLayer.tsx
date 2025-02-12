import { Layer, Source } from 'react-map-gl/mapbox';

export default function NeigborhoodPolygonLayer() {
  return (
    <Source
      id='neighbourhood-poly'
      type={'geojson'}
      data={
        'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville_neighbourhoods.geojson'
      }>
      <Layer
        source='neigbourhood-poly'
        type={'fill'}
        id='neighbourhood-layer'
        paint={{
          'fill-color': '#23a667',
          'fill-opacity': 0.5,
        }}
      />
    </Source>
  );
}
