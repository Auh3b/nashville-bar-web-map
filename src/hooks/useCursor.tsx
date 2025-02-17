import { useState } from 'react';
import { MapMouseEvent } from 'react-map-gl/mapbox';

export default function useCursor() {
  const [cursor, setCursor] = useState<string>('');
  const handleMouseEnter = (
    e: MapMouseEvent,
    callbacks?: ((e: MapMouseEvent) => void)[],
  ) => {
    setCursor('pointer');
    if (callbacks) {
      callbacks.forEach((func) => func(e));
    }
  };

  const handleMouseLeave = (
    e: MapMouseEvent,
    callbacks?: ((e: MapMouseEvent) => void)[],
  ) => {
    setCursor('');
    if (callbacks) {
      callbacks.forEach((func) => func(e));
    }
  };

  return {
    cursor,
    handleMouseEnter,
    handleMouseLeave,
  };
}
