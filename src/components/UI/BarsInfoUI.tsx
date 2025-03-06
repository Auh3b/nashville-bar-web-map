import BarSideItem from './BarSideItem';
import useMapStore from '../../data/mapStore';
import { IoCloseOutline } from 'react-icons/io5';
import { useRef } from 'react';

export default function BarsInfoUI() {
  const ref = useRef<null | HTMLDivElement>(null);

  const { isDataLoaded, setExplore, isMobile } = useMapStore((state) => state);
  const handleClose = () => {
    setExplore(false);
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 w-full md:py-2`}>
      {isDataLoaded && (
        <>
          <div className='flex items-center justify-between uppercase pl-3 pr-2 font-medium py-2 md:py-0'>
            {/* <span>Spots</span> */}
            {isMobile && (
              <button
                className=' hover:cursor-pointer'
                onClick={handleClose}>
                <IoCloseOutline size={24} />
              </button>
            )}
          </div>
          <BarSideItem />
        </>
      )}
    </div>
  );
}
