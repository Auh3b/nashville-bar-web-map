import BarSideItem from './BarSideItem';
import useMapStore from '../../data/mapStore';
import { IoCloseOutline } from 'react-icons/io5';
import { ReactNode, useMemo, useRef } from 'react';
import useDataMap from '../../hooks/useDataMap';

export default function BarsInfoUI() {
  const ref = useRef<null | HTMLDivElement>(null);

  const { isDataLoaded, preview, bar, setExplore, isMobile } = useMapStore(
    (state) => state,
  );
  const handleClose = () => {
    setExplore(false);
  };

  const bars = useDataMap('bars');

  const barsItems = useMemo(() => {
    if (bars) {
      const output: { [l: string]: ReactNode } = {};
      bars.forEach((d) => {
        output[d.id] = (
          // @ts-ignore
          <BarSideItem
            key={d.id}
            {...d}
          />
        );
      });

      return output;
    }
    return null;
  }, [bars]);

  const selectedId = useMemo(() => {
    if (preview?.bar) return preview.bar.id;
    if (bar) return bar.id;
    return null;
  }, [preview, bar]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 w-full md:py-2`}>
      {isDataLoaded && (
        <>
          <div className='flex items-center justify-between uppercase pl-3 pr-2 font-medium py-2 md:py-0'>
            {isMobile && (
              <button
                className=' hover:cursor-pointer'
                onClick={handleClose}>
                <IoCloseOutline size={24} />
              </button>
            )}
          </div>
          {selectedId && barsItems && barsItems[selectedId]}
        </>
      )}
    </div>
  );
}
