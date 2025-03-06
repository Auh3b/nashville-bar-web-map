import { ElfsightWidget } from 'react-elfsight-widget';
import { BarsItemProperty } from '../../utils/store.types';

interface BarSideItemProps extends BarsItemProperty {}

export default function BarSideItem(props: BarSideItemProps) {
  const { id, name, igWidgetId, description, address } = props;
  return (
    <>
      {props && (
        <div
          id={id}
          className={`flex flex-col`}>
          <div className='flex items-center justify-between  p-3  cursor-pointer border-b border-primary'>
            <span className='text-xs uppercase'>{name}</span>
          </div>
          <div
            className={` transition-all duration-500 ease-in-out  scrollbar-none max-h-fit`}>
            <div className='px-4 py-4 max-h-1/2'>
              <ElfsightWidget widgetId={igWidgetId} />
            </div>
            <div className='mb-4 px-4  text-sm'>📌{address}</div>
            <div className='px-4 mb-4 text-xs'>{description}</div>
          </div>
        </div>
      )}
    </>
  );
}
