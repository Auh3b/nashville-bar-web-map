import { Fragment } from 'react';
import BarsInfoUI from './BarsInfoUI';
import useMapStore from '../../data/mapStore';
import { useTransition, animated } from '@react-spring/web';
import useResize from '../../hooks/useResize';

export default function MobileDrawer() {
  const { ref, size } = useResize();
  const { explore } = useMapStore((state) => state);

  const transition = useTransition(explore, {
    from: { opacity: 0, transform: `translateY(${500}px)` },
    enter: { opacity: 1, transform: `translateY(0px)` },
    leave: { opacity: 0, transform: `translateY(${size.height}px)` },
    exitBeforeEnter: true,
  });
  return (
    <Fragment>
      {transition((springs, i) => {
        return i ? (
          <animated.div
            ref={ref}
            className={`md:hidden p-4 text-white fixed z-50 w-full h-full`}
            style={springs}>
            <div className='card-container w-full h-full container-dark'>
              <BarsInfoUI />
            </div>
          </animated.div>
        ) : (
          <></>
        );
      })}
    </Fragment>
  );
}
