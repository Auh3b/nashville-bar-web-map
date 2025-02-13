import React, { useState } from 'react';
import { HoverInfoCardProps } from '../components/UI/HoverInfoCard';
import { MapMouseEvent } from 'react-map-gl/mapbox';
import { LAYER_PROPERTY_MAP } from '../utils/mapHandlers';

export default function useHoverInfo() {
  const [hoverInfo, setHoverInfo] = useState<null | HoverInfoCardProps>(null);

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
  return {
    hoverInfo,
    handleMouseMove,
  };
}
