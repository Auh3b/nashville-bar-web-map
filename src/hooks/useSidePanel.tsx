import { useCallback, useRef, useState } from 'react';
import useSelectedFeature from './useSelectedFeature';
import { MapMouseEvent, MapRef, MarkerEvent } from 'react-map-gl/mapbox';
import { LAYER_PROPERTY_MAP } from '../utils/mapHandlers';
import { SidePanelQueue } from '../utils/component.types';
import { getBounds } from '../utils/geoFuncs';
import { bars } from '../data/database';

export default function useSidePanel() {
  const mapRef = useRef<MapRef | null>(null);
  const [sidePanel, setsidePanel] = useState<SidePanelQueue>({});
  const [explore, setExplore] = useState(false);
  const { getSelectedFeature, handleSelectedFeature } = useSelectedFeature();

  const [selectedBar, setSelectedBar] = useState<null | number>(null);
  const handleSelectBar = useCallback(
    (value: number | null) => {
      setSelectedBar(value);
      if (mapRef.current && value) {
        const { latitude, longitude } = bars[value];
        mapRef.current.flyTo({ center: [longitude, latitude], padding: 2 });
      }
    },
    [mapRef.current],
  );

  const handleClick = useCallback(
    (e: MapMouseEvent) => {
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

      if (mapRef.current) {
        const bounds = getBounds(e.features[0]);
        // @ts-ignore
        mapRef.current.fitBounds(bounds);
      }
    },
    [mapRef.current],
  );

  const handleExplore = (value: any) => {
    setExplore(value);
  };

  const handleBarClick = useCallback(
    (
      _e: MarkerEvent<MouseEvent>,
      t: { latitude: number; longitude: number; id: number },
    ) => {
      const { latitude, longitude, id } = t;
      setExplore(true);
      setSelectedBar(id);
      if (mapRef.current) {
        mapRef.current.flyTo({ center: [longitude, latitude], padding: 20 });
      }
    },
    [mapRef.current],
  );

  return {
    mapRef,
    handleClick,
    handleSelectBar,
    handleExplore,
    selectedBar,
    getSelectedFeature,
    explore,
    sidePanel,
    handleBarClick,
  };
}
