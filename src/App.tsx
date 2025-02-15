import './App.css';
import MapContainer from './components/map/MapContainer';
import { ViewState } from 'react-map-gl/mapbox';
import LegendUI from './components/map/LegendUI';
import useLegends from './hooks/useLegends';
import useCursor from './hooks/useCursor';
import MapLayersContainer from './components/map/layers';
import useSidePanel from './hooks/useSidePanel';
import SidePanel from './components/UI/SidePanel';
import MobileDrawer from './components/UI/MobileDrawer';

const initialViewState: ViewState = {
  longitude: -86.8110513,
  latitude: 36.1595261,
  zoom: 11,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

function App() {
  const { legends, handleLegendToggle } = useLegends();
  const { cursor, handleMouseEnter, handleMouseLeave } = useCursor();
  const {
    mapRef,
    sidePanel,
    explore,
    selectedBar,
    handleSelectBar,
    handleExplore,
    handleClick,
    getSelectedFeature,
  } = useSidePanel();

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gradient-to-br from-emerald-950 to-black md:p-4'>
      <div className='flex flex-col bg-teal-900 p-4 md:rounded-3xl text-white w-full h-full lg:w-2/3 lg:h-4/5 shadow'>
        <p className='mb-4'>Welcome to blog</p>
        <div className='flex grow gap-4 w-full'>
          <div className='grow'>
            <MapContainer
              mapProps={{
                // @ts-ignore
                ref: mapRef,
                cursor,
                interactiveLayerIds: legends,
                onClick: handleClick,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
              }}
              CSSStyle={{ flexGrow: 1, borderRadius: '16px' }}
              viewState={initialViewState}>
              <MapLayersContainer
                explore={explore}
                visibleLayers={legends}
                onSelectedFeature={getSelectedFeature}
              />
              <LegendUI
                items={legends}
                onToggle={handleLegendToggle}
              />
            </MapContainer>
          </div>
          <SidePanel
            {...sidePanel}
            explore={explore}
            onExpand={handleSelectBar}
            onExplore={handleExplore}
            selectedBar={selectedBar}
          />
        </div>
      </div>
      <MobileDrawer
        {...sidePanel}
        explore={explore}
        onExpand={handleSelectBar}
        onExplore={handleExplore}
        selectedBar={selectedBar}
      />
    </div>
  );
}

export default App;
