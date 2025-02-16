import { useCallback, useEffect, useRef, useState } from 'react';
import NeighborhoodInfo from './NeighborhoodInfo';
import BarsInfoUI from './BarsInfoUI';
import { SidePanelProps } from '../../utils/component.types';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';
import SidePanelItem from './SidePanelItem';

export default function MobileDrawer(props: SidePanelProps) {
  const { explore, onExpand, selectedBar, onExplore, ...sidePanel } = props;
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

  const handleExplore = useCallback(
    (name: string) => {
      setOpen(false);
      if (onExplore) onExplore(name);
    },
    [onExplore],
  );

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
        {explore ? (
          <SidePanelItem
            id='bars'
            {...size}>
            <BarsInfoUI
              explore={explore}
              selectedBar={selectedBar}
              onExpand={onExpand}
            />
          </SidePanelItem>
        ) : (
          <SidePanelItem
            id='neighborhood'
            {...size}>
            <NeighborhoodInfo
              {...sidePanel}
              explore={explore}
              onExplore={handleExplore}
            />
          </SidePanelItem>
        )}
      </div>
    </div>
  );
}
