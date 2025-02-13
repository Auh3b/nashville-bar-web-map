import { Marker, MarkerProps } from 'react-map-gl/mapbox';

interface BarMarkerProps extends MarkerProps {}

export default function BarMarker(props: BarMarkerProps) {
  return <Marker {...props} />;
}
