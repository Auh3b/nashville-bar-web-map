import { useCallback } from 'react';
import useMapStore from '../../data/mapStore';
import { scrollToId } from '../../utils/domfuncs';
import { useMap } from 'react-map-gl/mapbox';
const description =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae, animi neque illum nesciunt amet excepturi ab optio rerum alias.';
export default function NeighborhoodInfo() {
  const { preview, hood, isDataLoaded } = useMapStore((state) => state);
  const { map } = useMap();
  const handleExplore = useCallback(() => {
    if (!hood) return;
    scrollToId('bars');
    if (map) map.zoomTo(13.1);
  }, [hood]);

  return (
    <div className={`flex flex-col gap-4 w-full`}>
      {isDataLoaded && (preview?.hood || hood) && (
        <>
          <span className='text-xs uppercase border-b border-b-slate-700 p-4'>
            {preview?.hood ? preview.hood.name : hood?.name}
          </span>
          <span className='text-xs my-2 px-4'>
            {(preview?.hood || hood) && description}
          </span>
          {!preview?.hood && hood && (
            <span className='px-4 text-xs'>
              <span>To explore bars click here:</span>
              <button
                className='hover:cursor-pointer ml-2 underline underline-offset-4 decoration-dotted'
                onClick={handleExplore}>
                Explore Bars
              </button>
            </span>
          )}
        </>
      )}
    </div>
  );
}
