import { MapRef } from 'react-map-gl/mapbox';

export const loadImages = (
  map: MapRef,
  value: { url: string; label: string }[],
) => {
  console.log(value);
  try {
    for (let i = 0; i < value.length; i++) {
      const { url, label } = value[i];
      map.loadImage(url, (error, image) => {
        if (error) throw error;
        console.log(image, map.hasImage(label));
        if (map.hasImage(label)) throw `${label} is already loaded`;
        if (!image) throw 'Image did not load properly';
        map.addImage(label, image, { sdf: true });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
