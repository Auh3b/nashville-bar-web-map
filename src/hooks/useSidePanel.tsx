import { useCallback, useRef, useState } from 'react';
import useSelectedFeature from './useSelectedFeature';
import { MapMouseEvent, MapRef } from 'react-map-gl/mapbox';
import { LAYER_PROPERTY_MAP } from '../utils/mapHandlers';
import { SidePanelQueue } from '../utils/component.types';
import { getBounds } from '../utils/geoFuncs';
import { scrollToId } from '../utils/domfuncs';
import { Feature } from 'geojson';

export default function useSidePanel() {
  const mapRef = useRef<MapRef | null>(null);
  const [sidePanel, setsidePanel] = useState<SidePanelQueue>({});
  const [explore, setExplore] = useState('');
  const { getSelectedFeature, handleSelectedFeature } = useSelectedFeature();

  const [selectedBar, setSelectedBar] = useState<null | number>(null);
  const handleSelectBar = useCallback(
    (value: number | null, center?: number[]) => {
      setSelectedBar(value);
      if (mapRef.current) {
        mapRef.current.flyTo({
          // @ts-ignore
          center,
          padding: 2,
          zoom: 18,
        });
      }
    },
    [mapRef.current],
  );

  const handleClick = useCallback(
    (e: MapMouseEvent) => {
      if (!e.features?.length) return;
      const feature = e.features[0];
      const layerId = e.features[0].layer?.id || '';
      if (layerId === 'neighbourhood-layer') {
        return HandleHoodClick(feature, layerId, mapRef.current);
      }
      return handleBarClick(layerId, feature, mapRef.current);
    },
    [mapRef.current],
  );

  const handleExplore = useCallback(
    (value: any) => {
      setExplore(value);
      scrollToId('bars');
      if (mapRef.current) {
        mapRef.current.flyTo({ zoom: 13.1 });
      }
    },
    [mapRef.current],
  );

  function HandleHoodClick(
    feature: Feature,
    layerId: string,
    mapRef: MapRef | null,
  ) {
    setExplore('');
    const column = LAYER_PROPERTY_MAP[layerId];
    const value = feature.properties?.[column];
    handleSelectedFeature({
      [layerId]: {
        property: column,
        value,
      },
    });

    setsidePanel({ id: value, name: value });

    scrollToId('neighborhood');

    if (mapRef) {
      const bounds = getBounds(feature);
      // @ts-ignore
      mapRef.fitBounds(bounds, { padding: 20, maxZoom: 12.9 });
    }
  }

  function handleBarClick(
    layerId: string,
    feature: Feature,
    mapRef: MapRef | null,
  ) {
    // @ts-ignore
    const { name, latitude, longitude } = feature?.properties;
    const column = LAYER_PROPERTY_MAP[layerId];
    const value = feature.properties?.[column];
    handleSelectedFeature({
      [layerId]: {
        property: column,
        value,
      },
    });
    setSelectedBar(name.toLowerCase().replaceAll(' ', '_'));

    if (mapRef) {
      mapRef.flyTo({ center: [longitude, latitude], padding: 20 });
    }
  }

  return {
    mapRef,
    handleClick,
    handleSelectBar,
    handleExplore,
    selectedBar,
    getSelectedFeature,
    explore,
    sidePanel,
  };
}
