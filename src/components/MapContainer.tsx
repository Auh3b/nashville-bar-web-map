import { CSSProperties, PropsWithChildren } from 'react';
import Map, { MapProps, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  viewState?: ViewState;
  className?: string;
  CSSStyle?: CSSProperties;
  mapProps: MapProps;
}

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapContainer(
  props: PropsWithChildren<MapContainerProps>,
) {
  const { CSSStyle, viewState, mapProps, children } = props;
  return (
    <Map
      initialViewState={viewState}
      mapStyle='mapbox://styles/mapbox/streets-v12'
      style={CSSStyle}
      mapboxAccessToken={accessToken}
      {...mapProps}>
      {children}
    </Map>
  );
}
