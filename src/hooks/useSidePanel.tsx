import { useCallback, useRef, useState } from 'react';
import useSelectedFeature from './useSelectedFeature';
import { MapMouseEvent, MapRef } from 'react-map-gl/mapbox';
import { SidePanelQueue } from '../utils/component.types';
import { getBounds } from '../utils/geoFuncs';
import { scrollToId } from '../utils/domfuncs';
import { Feature } from 'geojson';

export default function useSidePanel() {
  const mapRef = useRef<MapRef | null>(null);
  const [sidePanel, setsidePanel] = useState<SidePanelQueue>({});
  const [preview, setPreview] = useState<SidePanelQueue | undefined>({});
  const [explore, setExplore] = useState('');
  const { getSelectedFeature, handleSelectedFeature, removeSelectedFeature } =
    useSelectedFeature();
  const [started, setStarted] = useState(false);

  const [selectedBar, setSelectedBar] = useState<null | number>(null);
  const handleSelectBar = useCallback(
    (value: number | null, center?: number[]) => {
      setSelectedBar(value);
      const layerId = 'bars-layer';
      const column = 'id';
      handleSelectedFeature({
        [layerId]: {
          property: column,
          value,
        },
      });
      if (mapRef.current) {
        mapRef.current.flyTo({
          // @ts-ignore
          center,
          padding: 2,
          zoom: 16,
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
        return handleHoodClick(feature, layerId, mapRef.current);
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

  function handleHoodClick(
    feature: Feature,
    layerId: string,
    mapRef: MapRef | null,
  ) {
    if (!started) setStarted(true);
    setExplore('');
    setSelectedBar(null);
    removeSelectedFeature('bars-layer');
    const id = feature.properties?.['id'];
    const name = feature.properties?.['name'];
    handleSelectedFeature({
      [layerId]: {
        property: 'id',
        value: id,
      },
    });

    setsidePanel({ id, name });

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
    const { latitude, longitude, id } = feature?.properties;
    handleSelectedFeature({
      [layerId]: {
        property: 'id',
        value: id,
      },
    });
    setSelectedBar(id);

    if (mapRef) {
      mapRef.flyTo({ center: [longitude, latitude], padding: 2, zoom: 16 });
    }
  }

  const handleEnter = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    const feature = e.features[0];
    const layerId = e.features[0].layer?.id || '';
    if (layerId !== 'neighbourhood-layer') return;

    const id = feature.properties?.['id'];
    const name = feature.properties?.['name'];
    setPreview({ id, name });
  };

  const handleMove = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    const feature = e.features[0];
    const layerId = e.features[0].layer?.id || '';
    if (layerId === 'neighbourhood-layer') return handleHoodMove(feature);
    return handleBarMove(feature);
  };

  const handleLeave = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    const layerId = e.features[0].layer?.id || '';
    if (layerId === 'neighbourhood-layer') return handleHoodLeave();
    return handleBarLeave();
  };

  function handleHoodMove(feature: Feature) {
    const id = feature.properties?.['id'];
    const name = feature.properties?.['name'];
    scrollToId('neighborhood');
    setPreview({ id, name });
  }
  function handleHoodLeave() {
    setPreview(undefined);
  }

  function handleBarMove(feature: Feature) {
    // @ts-ignore
    const { latitude, longitude, id } = feature?.properties;
    setPreview({ bar: id });
  }
  function handleBarLeave() {
    setPreview(undefined);
  }

  function ResetPreview() {
    setPreview(undefined);
  }

  return {
    preview,
    explore,
    started,
    mapRef,
    sidePanel,
    selectedBar,
    getSelectedFeature,
    handleClick,
    handleEnter,
    handleExplore,
    handleMove,
    handleLeave,
    handleSelectBar,
    ResetPreview,
  };
}
