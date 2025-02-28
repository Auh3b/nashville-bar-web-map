import { PropsWithChildren, useCallback } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import useMapStore from '../../data/mapStore';
import { BarsItemProperty } from '../../utils/store.types';
import { useMap } from 'react-map-gl/mapbox';

interface BarSideItemProps extends BarsItemProperty {}

export default function BarSideItem(
  props: PropsWithChildren<BarSideItemProps>,
) {
  const { children, ...rest } = props;
  const { hood, bar, preview, setBar } = useMapStore((state) => state);
  const { name, address, description, latitude, longitude } = rest;
  const open = preview?.bar ? preview.bar.id === rest.id : rest.id === bar?.id;
  const { map } = useMap();
  const handleClick = useCallback(() => {
    if (open) {
      setBar(undefined);
      if (map && hood)
        // @ts-ignore
        map.fitBounds(hood.bounds, { minZoom: 14, linear: true });
      return;
    }

    setBar(rest);
    if (map) map.flyTo({ center: [longitude, latitude], zoom: 18 });
  }, [open, rest, map, hood]);

  return (
    <div
      id={rest.id}
      className={`flex flex-col ${open && 'border-b border-primary '}`}>
      <div
        className='flex items-center justify-between  p-3  cursor-pointer border-b border-primary item-hover transition ease-in-out'
        onClick={handleClick}>
        <span className='text-xs uppercase'>{name}</span>
        <span>{open ? <FaAngleDown /> : <FaAngleRight />}</span>
      </div>
      <div
        className={` transition-all duration-500 ease-in-out  scrollbar-none ${
          open ? 'max-h-84 overflow-scroll' : 'max-h-0 overflow-hidden'
        }`}>
        {children}
        <div className='mb-4 px-4 pt-4 text-sm'>📌{address}</div>
        <div className='px-4 mb-4 text-xs'>{description}</div>
      </div>
    </div>
  );
}
