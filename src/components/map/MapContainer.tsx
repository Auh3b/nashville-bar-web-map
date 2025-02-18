import { CSSProperties, PropsWithChildren } from 'react';
import Map, { MapProps, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
// import ViewStateView from '../common/ViewStateView';
import useMapHandlers from '../../hooks/useMapHandlers';
import useMapStore from '../../data/mapStore';

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
  const { handleClick, handleLeave, handleMove } = useMapHandlers();
  const cursor = useMapStore((state) => state.cursor);
  return (
    <Map
      id='map'
      cursor={cursor}
      initialViewState={initialViewState}
      mapStyle='mapbox://styles/robertchiko/cm77litwb008301s69wi1a2lz'
      style={CSSStyle}
      // onMove={(e) => setViewState(e.viewState)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      mapboxAccessToken={accessToken}
      {...mapProps}>
      {/* {viewState && <ViewStateView viewState={viewState} />} */}
      {children}
    </Map>
  );
}
