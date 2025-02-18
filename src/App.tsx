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
import Header from './components/UI/Header';
import MapNav from './components/map/MapNav';

const initialViewState: ViewState = {
  longitude: -86.78,
  latitude: 36.18,
  zoom: 11.25,
  bearing: 0,
  pitch: 0,
  padding: { top: 20, bottom: 20, left: 20, right: 20 },
};

function App() {
  const { legends, handleLegendToggle } = useLegends();
  const { cursor, handleMouseEnter, handleMouseLeave } = useCursor();
  const {
    preview,
    explore,
    mapRef,
    selectedBar,
    sidePanel,
    started,
    getSelectedFeature,
    handleClick,
    handleExplore,
    handleSelectBar,
    handleEnter,
    handleLeave,
    handleMove,
    ResetPreview,
  } = useSidePanel();
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gradient-to-br from-emerald-950 to-black md:p-4'>
      <div className='flex flex-col bg-teal-900 p-4 md:rounded-3xl text-white w-full h-full lg:w-2/3 shadow'>
        <Header explore={explore} />
        <div className='flex grow md:gap-4'>
          <div
            className='grow'
            onMouseLeave={ResetPreview}>
            <MapContainer
              mapProps={{
                // @ts-ignore
                ref: mapRef,
                cursor,
                interactiveLayerIds: legends,
                onClick: handleClick,
                onMouseEnter: (e) => handleMouseEnter(e, [handleEnter]),
                onMouseLeave: (e) => handleMouseLeave(e, [handleLeave]),
                onMouseMove: handleMove,
              }}
              CSSStyle={{ flexGrow: 1, borderRadius: '16px' }}
              initialViewState={initialViewState}>
              <MapLayersContainer
                explore={explore}
                visibleLayers={legends}
                onSelectedFeature={getSelectedFeature}
              />
              {/* <LegendUI
                items={legends}
                onToggle={handleLegendToggle}
              /> */}
              <MapNav initialViewState={initialViewState} />
            </MapContainer>
          </div>
          <SidePanel
            preview={preview}
            {...sidePanel}
            started={started}
            explore={explore}
            onExpand={handleSelectBar}
            onExplore={handleExplore}
            selectedBar={selectedBar}
          />
        </div>
      </div>
      <MobileDrawer
        preview={preview}
        started={started}
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
