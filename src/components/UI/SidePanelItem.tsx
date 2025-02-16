import { PropsWithChildren } from 'react';

interface SidePanelItemProps {
  id: string;
  width: number;
  height: number;
}

export default function SidePanelItem(
  props: PropsWithChildren<SidePanelItemProps>,
) {
  const { width, height, children, id } = props;
  return (
    <div
      id={id}
      className='transition-all snap-center overflow-y-auto scrollbar-none'
      style={{ minWidth: width, minHeight: height }}>
      {children}
    </div>
  );
}
