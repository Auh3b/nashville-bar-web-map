import { Feature, Point, Polygon } from 'geojson';
import { useCallback } from 'react';
import { scrollToId } from '../utils/domfuncs';
import { MapMouseEvent, useMap } from 'react-map-gl/mapbox';
import { BarItem, HoodItem } from '../utils/store.types';
import { MapRef } from 'react-map-gl/mapbox';
import { getBounds } from '../utils/geoFuncs';
import useMapStore from '../data/mapStore';

export default function useMapHandlers() {
  const { setPreview, setHood, setBar, setCursor } = useMapStore(
    (state) => state,
  );
  const { map } = useMap();
  const handleClick = useCallback(
    (e: MapMouseEvent) => {
      if (!e.features?.length) return;
      const feature = e.features[0] as unknown;
      const layerId = e.features[0].layer?.id || '';
      if (layerId === 'neighbourhood-layer') {
        return handleHoodClick(feature as Feature<Polygon, HoodItem>, map);
      }
      return handleBarClick(feature as Feature<Point, BarItem>, map);
    },
    [map],
  );

  function handleHoodClick(
    feature: Feature<Polygon, HoodItem>,
    mapRef: MapRef | undefined,
  ) {
    const id = feature.properties?.['id'];
    const name = feature.properties?.['name'];
    setHood({ id, name });

    scrollToId('neighborhood');

    if (mapRef) {
      const bounds = getBounds(feature);
      // @ts-ignore
      mapRef.fitBounds(bounds, { padding: 20, maxZoom: 12.9 });
    }
  }

  function handleBarClick(
    feature: Feature<Point, BarItem>,
    mapRef: MapRef | undefined,
  ) {
    setBar({ ...feature?.properties });
    const { latitude, longitude } = feature.properties;

    if (mapRef) {
      mapRef.flyTo({ center: [longitude, latitude], padding: 2, zoom: 18 });
    }
  }

  const handleMove = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    const feature = e.features[0] as unknown;
    const layerId = e.features[0].layer?.id || '';
    if (layerId === 'neighbourhood-layer')
      return handleHoodMove(feature as Feature<Polygon, HoodItem>);
    return handleBarMove(feature as Feature<Point, BarItem>);
  };

  const handleLeave = (e: MapMouseEvent) => {
    if (!e.features?.length) return;
    const layerId = e.features[0].layer?.id || '';
    if (layerId === 'neighbourhood-layer') return handleHoodLeave();
    return handleBarLeave();
  };

  function handleHoodMove(feature: Feature<Polygon, HoodItem>) {
    setCursor('pointer');
    const id = feature.properties?.['id'];
    const name = feature.properties?.['name'];
    scrollToId('neighborhood');
    setPreview('hood', { id, name });
  }
  function handleHoodLeave() {
    setCursor('');
    setPreview('hood', undefined);
  }

  function handleBarMove(feature: Feature<Point, BarItem>) {
    setCursor('pointer');
    // @ts-ignore
    const { latitude, longitude, id } = feature?.properties;
    setPreview('bar', { bar: id });
  }
  function handleBarLeave() {
    setCursor('');
    setPreview('bar', undefined);
  }

  return {
    handleClick,
    handleMove,
    handleLeave,
  };
}
