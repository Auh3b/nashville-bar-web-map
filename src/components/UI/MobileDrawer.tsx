import { useEffect, useRef, useState } from 'react';
import NeighborhoodInfo from './NeighborhoodInfo';
import BarsInfoUI from './BarsInfoUI';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';
import SidePanelItem from './SidePanelItem';
import useMapStore from '../../data/mapStore';

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSizeChange = (e: HTMLDivElement) => {
    const height = e.clientHeight;
    const width = e.clientWidth;
    setSize({ width, height });
  };

  useEffect(() => {
    if (containerRef.current) {
      handleSizeChange(containerRef.current);
    }
  }, [containerRef.current]);
  const hood = useMapStore((state) => state.hood);

  return (
    <div
      ref={containerRef}
      className={`md:hidden bg-slate-950 text-white fixed transition-all duration-300 rounded-t-2xl z-50 w-screen  ${
        open ? '-bottom-5 h-full' : 'bottom-0 h-12'
      }`}>
      <div className='flex justify-end'>
        <button
          className='py-3 pr-3'
          onClick={handleToggle}>
          {open ? <FaAnglesDown /> : <FaAnglesUp />}
        </button>
      </div>
      <div
        id='mobile-drawer'
        className=' '>
        {hood ? (
          <SidePanelItem
            id='bars'
            {...size}>
            <BarsInfoUI />
          </SidePanelItem>
        ) : (
          <SidePanelItem
            id='neighborhood'
            {...size}>
            <NeighborhoodInfo />
          </SidePanelItem>
        )}
      </div>
    </div>
  );
}
