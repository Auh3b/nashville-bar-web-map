import { Feature, Point, Polygon } from 'geojson';
import { useCallback } from 'react';
import { MapMouseEvent, useMap } from 'react-map-gl/mapbox';
import { BarItem, HoodItem } from '../utils/store.types';
import { MapRef } from 'react-map-gl/mapbox';
import { getBounds } from '../utils/geoFuncs';
import useMapStore from '../data/mapStore';
import layers from '../data/layers';
const interactiveLayerIds = Object.values(layers);

export default function useMapHandlers() {
  const {
    setPreview,
    setHood,
    setBar,
    setCursor,
    setInteractiveLayerIds,
    setExplore,
    setHoodCenter,
    isMobile,
  } = useMapStore((state) => state);

  const { map } = useMap();

  const handleHoodClick = useCallback(
    (
      feature: Feature<Polygon, HoodItem>,
      mapRef: MapRef | undefined,
      point: number[],
    ) => {
      const id = feature.properties?.['id'];
      const name = feature.properties?.['name'];
      const bounds = getBounds(feature);
      setHood({ id, name, bounds });
      if (!isMobile) setExplore(true);
      if (isMobile) setHoodCenter(point);

      if (mapRef) {
        setInteractiveLayerIds(undefined);
        // @ts-ignore
        mapRef.fitBounds(bounds, { padding: 20, zoom: 13.1 });
        setTimeout(() => setInteractiveLayerIds(interactiveLayerIds), 2000);
      }
    },
    [isMobile],
  );
  const handleBarClick = useCallback(
    (feature: Feature<Point, BarItem>, mapRef: MapRef | undefined) => {
      setBar({ ...feature?.properties });
      const { latitude, longitude } = feature.properties;

      if (mapRef) {
        mapRef.flyTo({ center: [longitude, latitude], padding: 2, zoom: 18 });
      }
      if (isMobile) setExplore(true);
    },
    [isMobile],
  );

  const handleClick = useCallback(
    (e: MapMouseEvent) => {
      if (!e.features?.length) return;
      const feature = e.features[0] as unknown;
      const layerId = e.features[0].layer?.id || '';
      const { lat, lng } = e.lngLat;
      if (layerId === layers.NEIGHBOHOOD_LAYER) {
        return handleHoodClick(feature as Feature<Polygon, HoodItem>, map, [
          lng,
          lat,
        ]);
      }
      if (layerId === layers.BARS_LAYER)
        return handleBarClick(feature as Feature<Point, BarItem>, map);
      if (layerId === layers.BARS_LAYER_CLUSTER) {
        if (map) map.flyTo({ center: [lng, lat], zoom: 17, linear: true });
      }
    },
    [map, isMobile],
  );

  const handleMove = useCallback(
    (e: MapMouseEvent) => {
      if (isMobile) return;
      if (!e.features?.length) return;
      const feature = e.features[0] as unknown;
      const layerId = e.features[0].layer?.id || '';
      if (layerId === 'neighbourhood-layer')
        return handleHoodMove(feature as Feature<Polygon, HoodItem>);
      return handleBarMove(feature as Feature<Point, BarItem>);
    },
    [isMobile],
  );

  function handleHoodMove(feature: Feature<Polygon, HoodItem>) {
    setCursor('pointer');
    const id = feature.properties?.['id'];
    const name = feature.properties?.['name'];
    const bounds = getBounds(feature);
    setExplore(false);
    setBar(undefined);
    setHood({ id, name, bounds });
  }

  function handleBarMove(feature: Feature<Point, BarItem>) {
    setCursor('pointer');
    // @ts-ignore
    const { latitude, longitude, id } = feature?.properties;
    setPreview('bar', { id });
  }

  const handleEnter = useCallback(
    (e: MapMouseEvent) => {
      if (isMobile) return;
      if (!e.features?.length) return;
      const layerId = e.features[0].layer?.id || '';
      if (layerId === 'neighbourhood-layer') return;
      return handleBarEnter();
    },
    [isMobile],
  );

  function handleBarEnter() {
    setExplore(true);
  }

  const handleLeave = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    const layerId = e.features[0].layer?.id || '';
    if (layerId === 'neighbourhood-layer') return handleHoodLeave();
    return handleBarLeave();
  };

  function handleHoodLeave() {
    setCursor('');
    setHood(undefined);
  }

  function handleBarLeave() {
    setCursor('');
    setPreview('bar', undefined);
  }

  return {
    handleClick,
    handleEnter,
    handleLeave,
    handleMove,
  };
}
