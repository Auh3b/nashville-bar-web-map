import { useEffect, useRef, useState } from 'react';
import NeighborhoodInfo from './NeighborhoodInfo';
import BarsInfoUI from './BarsInfoUI';
import { SidePanelProps } from '../../utils/component.types';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';

export default function MobileDrawer(props: SidePanelProps) {
  const [open, setOpen] = useState(false);
  const { explore, onExpand, selectedBar, onExplore, ...sidePanel } = props;
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current);
    }
  }, [containerRef.current]);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
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
      <NeighborhoodInfo
        {...sidePanel}
        explore={explore}
        onExplore={onExplore}
      />

      <BarsInfoUI
        explore={explore}
        selectedBar={selectedBar}
        onExpand={onExpand}
      />
    </div>
  );
}
