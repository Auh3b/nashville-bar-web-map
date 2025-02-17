import { useCallback } from 'react';
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
    <div className={`flex flex-col gap-4 tranasition all w-full`}>
      <span className='text-xs uppercase border-b border-b-slate-700 p-4'>
        {preview ? preview.name : name ? name : id}
      </span>
      <span className='text-xs my-2 px-4'>
        {preview?.description ? preview.description : description}
      </span>
      <button
        className='hover:cursor-pointer border border-slate-600 hover:border-slate-100 transition-all duration-500 ease-in-out self-start py-2 px-3 rounded-full ml-4'
        onClick={handleExplore}>
        Explore Bars
      </button>
    </div>
  );
}
