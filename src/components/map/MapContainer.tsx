import { CSSProperties, PropsWithChildren /*useState*/ } from 'react';
import Map, { MapProps, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
// import ViewStateView from '../common/ViewStateView';

interface MapContainerProps {
  initialViewState?: ViewState;
  className?: string;
  CSSStyle?: CSSProperties;
  mapProps: MapProps;
}

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapContainer(
  props: PropsWithChildren<MapContainerProps>,
) {
  const { CSSStyle, initialViewState, mapProps, children } = props;
  // const [viewState, setViewState] = useState(initialViewState);
  return (
    <Map
      initialViewState={initialViewState}
      mapStyle='mapbox://styles/robertchiko/cm77litwb008301s69wi1a2lz'
      style={CSSStyle}
      // onMove={(e) => setViewState(e.viewState)}
      mapboxAccessToken={accessToken}
      {...mapProps}>
      {/* {viewState && <ViewStateView viewState={viewState} />} */}
      {children}
    </Map>
  );
}
