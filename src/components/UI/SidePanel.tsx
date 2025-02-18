import { useRef } from 'react';
import BarsInfoUI from './BarsInfoUI';
import NeighborhoodInfo from './NeighborhoodInfo';
import SidePanelItem from './SidePanelItem';
import useResize from '../../hooks/useResize';

export default function SidePanel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { size } = useResize(containerRef);
  return (
    <div
      ref={containerRef}
      className={` py-2 rounded-2xl bg-gray-900 hidden  md:flex overflow-x-auto overflow-y-hidden scrollbar-none snap-x scroll-smooth max-h-145 w-1/3 lg:max-h-145 transition-all duration-300`}>
      <SidePanelItem
        id='neighborhood'
        {...size}>
        <NeighborhoodInfo />
      </SidePanelItem>
      <SidePanelItem
        id='bars'
        {...size}>
        <BarsInfoUI />
      </SidePanelItem>
    </div>
  );
}
