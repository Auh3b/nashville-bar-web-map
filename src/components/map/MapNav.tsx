import { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import { TiHome } from 'react-icons/ti';
import { useMap, ViewState } from 'react-map-gl/mapbox';
export default function MapNav(props: { initialViewState: ViewState }) {
  const { initialViewState } = props;
  const { current: map } = useMap();
  const handleZoomIn = useCallback(() => {
    map?.zoomIn();
  }, [map]);
  const handleZoomOut = useCallback(() => {
    map?.zoomOut();
  }, [map]);
  const handleResetView = () => {
    map?.flyTo({
      center: [initialViewState.longitude, initialViewState.latitude],
      padding: initialViewState.padding,
      zoom: initialViewState.zoom,
    });
  };
  return (
    <div className='card-container container-dark absolute top-2 right-2 flex flex-col'>
      <button
        className='button p-1'
        onClick={handleZoomIn}>
        <FaPlus size={16} />
      </button>
      <button
        className='button p-1 border-t border-dark'
        onClick={handleZoomOut}>
        <FaMinus size={16} />
      </button>
      <button
        className='button p-1 border-t border-dark'
        onClick={handleResetView}>
        <TiHome size={16} />
      </button>
    </div>
  );
}
