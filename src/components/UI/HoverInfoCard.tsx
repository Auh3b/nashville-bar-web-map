import { PropsWithChildren } from 'react';

interface HoverInfoPosition {
  x: number;
  y: number;
}

export type HoverInfoCardProps = PropsWithChildren<HoverInfoPosition>;

export default function HoverInfoCard(props: HoverInfoCardProps) {
  const { x, y, children } = props;
  return (
    <>
      {x && y && (
        <div
          className={`px-3 py-2 bg-black absolute rounded-lg`}
          style={{ transform: `translate(${x + 20}px, ${y}px)` }}>
          {children}
        </div>
      )}
    </>
  );
}
