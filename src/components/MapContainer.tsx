import { CSSProperties, PropsWithChildren } from 'react';
import Map, { ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  viewState?: ViewState;
  className?: string;
  CSSStyle?: CSSProperties;
}

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapContainer(
  props: PropsWithChildren<MapContainerProps>,
) {
  const { CSSStyle, viewState, children } = props;
  return (
    <Map
      initialViewState={viewState}
      mapStyle='mapbox://styles/mapbox/streets-v12'
      style={CSSStyle}
      mapboxAccessToken={accessToken}>
      {children}
    </Map>
  );
}
