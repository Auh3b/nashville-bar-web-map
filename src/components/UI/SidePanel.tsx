import BarsInfoUI from './BarsInfoUI';
import NeighborhoodInfo from './NeighborhoodInfo';
import useResize from '../../hooks/useResize';
import useMapStore from '../../data/mapStore';
import { useTransition, animated } from '@react-spring/web';

export default function SidePanel() {
  const explore = useMapStore((state) => state.explore);
  const { ref, size } = useResize();

  const transitions = useTransition(explore, {
    from: { transform: `translateX(${size.width}px)` },
    enter: { opacity: 1, transform: `translateX(0px)` },
    leave: { opacity: 0, transform: `translateX(${size.width}px)` },
    exitBeforeEnter: true,
  });
  return (
    <div
      ref={ref}
      className={`relative py-2 rounded-2xl bg-gray-900 hidden  md:flex overflow-x-auto overflow-y-hidden scrollbar-none w-1/3 h-full`}>
      {transitions((springs, i) => {
        return (
          <animated.div
            className={`h-full overflow-y-scroll scrollbar-none`}
            style={{
              minWidth: size.width,
              maxHeight: size.height - 8,
              ...springs,
            }}>
            {i ? <BarsInfoUI /> : <NeighborhoodInfo />}
          </animated.div>
        );
      })}
    </div>
  );
}
