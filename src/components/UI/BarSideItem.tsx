import { PropsWithChildren, useCallback } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

interface BarSideItemProps {
  id: any;
  name: string;
  address: string;
  description: string;
  selected: any;
  latitude: number;
  longitude: number;
  onExpand: (value: any, center?: number[]) => void;
}

export default function BarSideItem(
  props: PropsWithChildren<BarSideItemProps>,
) {
  const {
    id,
    name,
    address,
    description,
    selected,
    onExpand,
    latitude,
    longitude,
  } = props;

  const open = selected == id;
  const handleClick = useCallback(() => {
    if (open) {
      onExpand(null);
    } else {
      onExpand(id, [longitude, latitude]);
    }
  }, [selected, open]);

  return (
    <div className={`flex flex-col ${open && 'border-b border-b-slate-700 '}`}>
      <div
        className='flex items-center justify-between  p-3  cursor-pointer border-b border-b-slate-700  hover:bg-slate-800 transition ease-in-out'
        onClick={handleClick}>
        <span className='text-xs uppercase'>{name}</span>
        <span>{open ? <FaAngleDown /> : <FaAngleRight />}</span>
      </div>
      <div
        className={` transition-all duration-500 ease-in-out  scrollbar-none ${
          open ? 'max-h-84 overflow-scroll' : 'max-h-0 overflow-hidden'
        }`}>
        <div className='mb-4 px-4 pt-4 text-sm'>📌{address}</div>
        <div className='px-4 mb-4 text-xs'>{description}</div>

        {props.children}
      </div>
    </div>
  );
}
