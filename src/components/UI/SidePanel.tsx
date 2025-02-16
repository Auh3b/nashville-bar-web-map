import { useRef } from 'react';
import { SidePanelProps } from '../../utils/component.types';
import BarsInfoUI from './BarsInfoUI';
import NeighborhoodInfo from './NeighborhoodInfo';
import SidePanelItem from './SidePanelItem';
import useResize from '../../hooks/useResize';

export default function SidePanel(props: SidePanelProps) {
  const { explore, onExpand, selectedBar, onExplore, ...sidePanel } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { size } = useResize(containerRef);
  return (
    <div
      ref={containerRef}
      className={` py-2 rounded-2xl bg-gray-900 w-1/3 hidden max-h-145 lg:max-h-145 md:flex overflow-x-auto overflow-y-hidden scrollbar-none snap-x scroll-smooth`}>
      <SidePanelItem
        id='neighborhood'
        {...size}>
        <NeighborhoodInfo
          {...sidePanel}
          explore={explore}
          onExplore={onExplore}
        />
      </SidePanelItem>
      <SidePanelItem
        id='bars'
        {...size}>
        <BarsInfoUI
          explore={explore}
          selectedBar={selectedBar}
          onExpand={onExpand}
        />
      </SidePanelItem>
    </div>
  );
}
