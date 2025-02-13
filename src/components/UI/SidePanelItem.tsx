import { PropsWithChildren } from 'react';

interface SidePanelItemProps {
  width: number;
  height: number;
}

export default function SidePanelItem(
  props: PropsWithChildren<SidePanelItemProps>,
) {
  const { width, height, children } = props;
  return <div style={{ width, height }}>{children}</div>;
}
