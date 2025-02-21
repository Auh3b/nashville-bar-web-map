import './App.css';
// import MapContainer from './components/map/MapContainer';
import { MapProvider, ViewState } from 'react-map-gl/mapbox';
import useLegends from './hooks/useLegends';
import MapLayersContainer from './components/map/layers';
import useSidePanel from './hooks/useSidePanel';
import SidePanel from './components/UI/SidePanel';
import MobileDrawer from './components/UI/MobileDrawer';
import Header from './components/UI/Header';
import MapNav from './components/map/MapNav';
import useLoadLayers from './hooks/useLoadLayers';

import LoadingMap from './components/common/loading/LoadingMap';
import { lazy, Suspense } from 'react';

const initialViewState: ViewState = {
  longitude: -86.78,
  latitude: 36.18,
  zoom: 11.25,
  bearing: 0,
  pitch: 0,
  padding: { top: 20, bottom: 20, left: 20, right: 20 },
};

const MapContainer = lazy(() => import('./components/map/MapContainer'));

function App() {
  useLoadLayers();
  const { legends } = useLegends();
  const { ResetPreview } = useSidePanel();
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gradient-to-br from-emerald-950 to-black md:p-4'>
      <MapProvider>
        <div className='flex flex-col bg-teal-900 p-4 md:rounded-3xl text-white w-full h-full lg:w-2/3 shadow'>
          <Header />
          <div className='flex grow md:gap-4'>
            <div
              className='grow'
              onMouseLeave={ResetPreview}>
              <Suspense fallback={<LoadingMap />}>
                <MapContainer
                  mapProps={{
                    interactiveLayerIds: legends,
                  }}
                  CSSStyle={{ flexGrow: 1, borderRadius: '16px' }}
                  initialViewState={initialViewState}>
                  <MapLayersContainer />
                  <MapNav initialViewState={initialViewState} />
                </MapContainer>
              </Suspense>
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
