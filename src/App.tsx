import { useState } from 'react';
import './App.css';
import BarMarker from './components/BarMarker';
import BarSideItem from './components/BarSideItem';
import MapContainer from './components/MapContainer';
import { bars } from './data/database';
import { MapMouseEvent, ViewState } from 'react-map-gl/mapbox';
import NeigborhoodPolygonLayer from './components/NeigborhoodPolygonLayer';
import NeighborhoodPointLayer from './components/NeighborhoodPointLayer';
import HoverInfoCard, { HoverInfoCardProps } from './components/HoverInfoCard';
import { LAYER_PROPERTY_MAP } from './utils/mapHandlers';
import ZipcodeLayer from './components/ZipcodeLayer';
import useSelectedFeature from './hooks/useSelectedFeature';
import NeighborhoodInfo from './components/NeighborhoodInfo';
import LegendUI from './components/LegendUI';

const initialViewState: ViewState = {
  longitude: -86.8110513,
  latitude: 36.1595261,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

interface SidePanelQueue {
  id?: any;
  [k: string]: any;
}

const legendItems = [
  'neighbourhood-layer',
  'neighbourhood-point-id',
  'zipcode-layer',
];

function App() {
  const [legends, setLegends] = useState(legendItems);
  const [sidePanel, setsidePanel] = useState<SidePanelQueue>({});
  const [explore, setExplore] = useState(false);
  const { getSelectedFeature, handleSelectedFeature } = useSelectedFeature();
  const [hoverInfo, setHoverInfo] = useState<null | HoverInfoCardProps>(null);

  const [cursor, setCursor] = useState<string>('');
  const [selected, setSelected] = useState(null);
  const handleExpand = (value: any) => {
    setSelected(value);
  };

  const handleMouseEnter = () => {
    setCursor('pointer');
  };

  const handleMouseExit = () => {
    setCursor('');
  };

  const handleMouseMove = (e: MapMouseEvent) => {
    if (!e.features?.length) {
      return setHoverInfo(null);
    }
    const { x, y } = e.point;
    const layerId = e.features[0].layer?.id || '';
    const children = e.features[0].properties?.[LAYER_PROPERTY_MAP[layerId]];
    setHoverInfo({
      x,
      y,
      children,
    });
  };

  const handleClick = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    setExplore(false);
    const layerId = e.features[0].layer?.id || '';
    const column = LAYER_PROPERTY_MAP[layerId];
    const value = e.features[0].properties?.[column];
    handleSelectedFeature({
      [layerId]: {
        property: column,
        value,
      },
    });

    setsidePanel({ id: value, name: value });
  };

  const handleExplore = (value: any) => {
    setExplore(value);
  };

  const handleLegendToggle = (value: any) => {
    console.log(value);
    setLegends((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    );
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gradient-to-br from-emerald-950 to-black p-4'>
      <div className='flex flex-col bg-teal-900 p-4 rounded-3xl text-white w-full h-full lg:w-2/3 lg:h-4/5 shadow'>
        <p className='mb-4'>Welcome to blog</p>
        <div className='flex grow gap-4 w-full'>
          <div className='grow'>
            <MapContainer
              mapProps={{
                cursor,
                interactiveLayerIds: [
                  'neighbourhood-layer',
                  'neighbourhood-point-id',
                  'zipcode-layer',
                ],
                onClick: handleClick,
                onMouseMove: handleMouseMove,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseExit,
              }}
              CSSStyle={{ flexGrow: 1, borderRadius: '16px' }}
              viewState={initialViewState}>
              {bars.map(({ name, latitude, longitude }) => (
                <BarMarker
                  key={name}
                  latitude={latitude}
                  longitude={longitude}
                />
              ))}
              {hoverInfo && <HoverInfoCard {...hoverInfo} />}
              <ZipcodeLayer
                selectedFeature={getSelectedFeature('zipcode-layer')}
                legends={legends}
              />
              <NeigborhoodPolygonLayer
                selectedFeature={getSelectedFeature('neighbourhood-layer')}
                legends={legends}
              />
              <NeighborhoodPointLayer
                selectedFeature={getSelectedFeature('neighbourhood-point-id')}
                legends={legends}
              />
              <LegendUI
                items={legends}
                onToggle={handleLegendToggle}
              />
            </MapContainer>
          </div>
          <div className='py-2 rounded-2xl bg-gray-900 w-1/3 overflow-y-auto max-h-150 lg:max-h-117 scrollbar-none flex'>
            <NeighborhoodInfoUI
              {...sidePanel}
              explore={explore}
              onExplore={handleExplore}
            />

            <BarsInfoUI
              explore={explore}
              // @ts-ignore
              selected={selected}
              onExpand={handleExpand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function NeighborhoodInfoUI(
  props: SidePanelQueue & {
    onExplore?: (value: any) => void;
    explore?: boolean;
  },
) {
  return <NeighborhoodInfo {...props} />;
}

function BarsInfoUI(props: {
  explore: boolean;
  selected: string;
  onExpand: (value: any) => void;
}) {
  const { explore, selected, onExpand } = props;
  return (
    <div
      className={`transition-all duration-500 ${explore ? 'grow' : 'hidden'}`}>
      {bars.map(({ name, address, description }, i) => (
        <BarSideItem
          key={i}
          name={name}
          address={address}
          description={description}
          id={i}
          selected={selected}
          onExpand={onExpand}
        />
      ))}
    </div>
  );
}
