import { Popup, useMap } from 'react-map-gl/mapbox';
import useMapStore from '../../data/mapStore';
import { Fragment, useCallback } from 'react';
import { FaAngleRight } from 'react-icons/fa6';

export default function MobileHoodView() {
  const { hood, explore, hoodCenter, isMobile, setExplore, setHoodCenter } =
    useMapStore((state) => state);
  const mapRef = useMap();
  const handleClick = useCallback(() => {
    setExplore(true);
    setHoodCenter(undefined);
    if (mapRef.current) {
      mapRef.current.zoomTo(13.1);
    }
  }, [mapRef.current]);
  const open = !explore && hoodCenter && isMobile && hood;
  return (
    <Fragment>
      {open && (
        <Popup
          latitude={hoodCenter[1]}
          longitude={hoodCenter[0]}
          closeOnClick={false}
          closeButton={false}>
          <div className='flex flex-col gap-2'>
            <span className='text-lg font-bold'>{hood?.name}</span>
            <span className='text-xs'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non odit
              inventore et doloribus aperiam atque dolorum accusantium deserunt,
              itaque sed.
            </span>
            <button
              className='self-start text-amber-300 py-2 pr-2 flex items-center gap-2 hover:cursor-pointer'
              onClick={handleClick}>
              See Bars <FaAngleRight />
            </button>
          </div>
        </Popup>
      )}
    </Fragment>
  );
}
