import { useEffect, useRef } from 'react';
import { SidePanelProps } from '../../utils/component.types';
import BarsInfoUI from './BarsInfoUI';
import NeighborhoodInfo from './NeighborhoodInfo';

export default function SidePanel(props: SidePanelProps) {
  const { explore, onExpand, selectedBar, onExplore, ...sidePanel } = props;
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current);
    }
  }, [containerRef.current]);

  return (
    <div
      ref={containerRef}
      className='py-2 rounded-2xl bg-gray-900 w-1/3 overflow-hidden hidden max-h-150 lg:max-h-117 md:flex'>
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
