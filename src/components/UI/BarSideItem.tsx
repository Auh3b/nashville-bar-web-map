import { useMemo } from 'react';
import useMapStore from '../../data/mapStore';
import { ElfsightWidget } from 'react-elfsight-widget';

export default function BarSideItem() {
  const { bar, preview } = useMapStore((state) => state);

  const data = useMemo(() => {
    if (preview?.bar) return preview.bar;
    if (bar) return bar;
    return null;
  }, [preview, bar]);

  const IgWidget = useMemo(() => {
    if (!data) return null;
    console.log(data.igWidgetId);
    return (
      <ElfsightWidget
        lazy={'disabled'}
        widgetId={data.igWidgetId}
      />
    );
  }, [data]);

  return (
    <>
      {data && (
        <div
          id={data.id}
          className={`flex flex-col`}>
          <div className='flex items-center justify-between  p-3  cursor-pointer border-b border-primary'>
            <span className='text-xs uppercase'>{data.name}</span>
          </div>
          <div
            className={` transition-all duration-500 ease-in-out  scrollbar-none max-h-fit`}>
            <div className='px-4 py-4 max-h-1/2'>{IgWidget}</div>
            <div className='mb-4 px-4  text-sm'>📌{data.address}</div>
            <div className='px-4 mb-4 text-xs'>{data.description}</div>
          </div>
        </div>
      )}
    </>
  );
}
