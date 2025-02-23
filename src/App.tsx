import './App.css';
import MapContainer from './components/map/MapContainer';
import { MapProvider, ViewState } from 'react-map-gl/mapbox';
import MapLayersContainer from './components/map/layers';
import useSidePanel from './hooks/useSidePanel';
import SidePanel from './components/UI/SidePanel';
import MobileDrawer from './components/UI/MobileDrawer';
import Header from './components/UI/Header';
import MapNav from './components/map/MapNav';
import useLoadLayers from './hooks/useLoadLayers';
import useMapStore from './data/mapStore';
import useResize from './hooks/useResize';
import { useEffect } from 'react';
import MobileHoodView from './components/UI/MobileHoodView';
import layers from './data/layers';

const initialViewState: ViewState = {
  longitude: -86.78,
  latitude: 36.18,
  zoom: 11.25,
  bearing: 0,
  pitch: 0,
  padding: { top: 20, bottom: 20, left: 20, right: 20 },
};

const interactiveLayerIds = Object.values(layers);

function App() {
  useLoadLayers();
  const setIsMobile = useMapStore((state) => state.setIsMobile);
  const { ResetPreview } = useSidePanel();
  const { ref, size } = useResize();
  useEffect(() => {
    if (size.width > 485) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [size.width]);
  return (
    <div
      ref={ref}
      className='relative flex items-center justify-center w-full h-full  md:p-4'>
      <MapProvider>
        <div className='flex flex-col bg-teal-900 p-4 md:rounded-3xl text-white w-full h-full shadow'>
          <Header />
          <div className='flex grow md:gap-4'>
            <div
              className='grow'
              onMouseLeave={ResetPreview}>
              <MapContainer
                mapProps={{
                  interactiveLayerIds,
                }}
                CSSStyle={{ flexGrow: 1, borderRadius: '16px' }}
                initialViewState={initialViewState}>
                <MobileHoodView />
                <MapLayersContainer />
                <MapNav initialViewState={initialViewState} />
              </MapContainer>
            </div>
            <SidePanel />
          </div>
        </div>
        <MobileDrawer />
      </MapProvider>
    </div>
  );
}

export default App;
