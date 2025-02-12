import { useState } from 'react';
import './App.css';
import BarMarker from './components/BarMarker';
import BarSideItem from './components/BarSideItem';
import MapContainer from './components/MapContainer';
import { bars } from './data/database';
import { ViewState } from 'react-map-gl/mapbox';
import NeigborhoodPolygonLayer from './components/NeigborhoodPolygonLayer';
import NeighborhoodPointLayer from './components/NeighborhoodPointLayer';

const initialViewState: ViewState = {
  longitude: -86.8110513,
  latitude: 36.1595261,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

function App() {
  const [selected, setSelected] = useState(null);
  const handleExpand = (value: any) => {
    setSelected(value);
  };
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gradient-to-br from-emerald-950 to-black p-4'>
      <div className='flex flex-col bg-teal-900 p-4 rounded-3xl text-white w-full h-full lg:w-2/3 lg:h-4/5 shadow'>
        <p className='mb-4'>Welcome to blog</p>
        <div className='flex grow gap-4 w-full'>
          <div className='grow'>
            <MapContainer
              CSSStyle={{ flexGrow: 1, borderRadius: '16px' }}
              viewState={initialViewState}>
              {bars.map(({ name, latitude, longitude }) => (
                <BarMarker
                  key={name}
                  latitude={latitude}
                  longitude={longitude}
                />
              ))}
              <NeigborhoodPolygonLayer />
              <NeighborhoodPointLayer />
            </MapContainer>
          </div>
          <div className='rounded-2xl bg-gray-900 w-1/3 overflow-y-auto max-h-150 lg:max-h-117'>
            {bars.map(({ name, address, description }, i) => (
              <BarSideItem
                key={i}
                name={name}
                address={address}
                description={description}
                id={i}
                selected={selected}
                onExpand={handleExpand}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
