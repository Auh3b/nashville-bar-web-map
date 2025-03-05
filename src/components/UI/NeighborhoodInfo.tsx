import { useEffect, useRef } from 'react';
import useMapStore from '../../data/mapStore';
import DOMPurify from 'dompurify';

export default function NeighborhoodInfo() {
  const { preview, hood, isDataLoaded } = useMapStore((state) => state);
  const ref = useRef<null | HTMLElement>(null);
  useEffect(() => {
    if (ref.current && hood?.description) {
      const clean = DOMPurify.sanitize(hood.description);
      ref.current.innerHTML = clean;
    }
  }, [ref.current, hood?.description]);

  return (
    <div className={`flex flex-col gap-4 w-full`}>
      {isDataLoaded && (preview?.hood || hood) && (
        <>
          <span className='text-xs uppercase border-b border-primary p-4'>
            {preview?.hood ? preview.hood.name : hood?.name}
          </span>
          <span
            ref={ref}
            className='text-xs my-2 px-4'></span>
        </>
      )}
    </div>
  );
}
