import { Fragment, useCallback } from 'react';
import { NeighborhoodInfoProps } from '../../utils/component.types';

export default function NeighborhoodInfo(props: NeighborhoodInfoProps) {
  const {
    id,
    name,
    description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae, animi neque illum nesciunt amet excepturi ab optio rerum alias.',
    preview,
    onExplore,
  } = props;
  const handleExplore = useCallback(() => {
    if (onExplore) onExplore(name);
  }, [name]);
  return (
    <Fragment>
      {(preview || id) && (
        <div className={`flex flex-col gap-4 tranasition all w-full`}>
          <span className='text-xs uppercase border-b border-b-slate-700 p-4'>
            {preview ? preview.name : name ? name : id}
          </span>
          <span className='text-xs my-2 px-4'>
            {preview?.description ? preview.description : description}
          </span>
          {!preview && id && (
            <span className='px-4 text-sm'>
              <span>To explore bars click</span>
              <button
                className='hover:cursor-pointer ml-2 underline underline-offset-4 decoration-dotted '
                onClick={handleExplore}>
                Explore Bars
              </button>
            </span>
          )}
        </div>
      )}
    </Fragment>
  );
}
