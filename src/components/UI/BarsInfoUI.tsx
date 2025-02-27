import BarSideItem from './BarSideItem';
import { ElfsightWidget } from 'react-elfsight-widget';
import { LuBeerOff } from 'react-icons/lu';
import useDataMap from '../../hooks/useDataMap';
import useMapStore from '../../data/mapStore';
import { IoCloseOutline } from 'react-icons/io5';

export default function BarsInfoUI() {
  const bars = useDataMap('bars');
  const { hood, isDataLoaded, setExplore, isMobile } = useMapStore(
    (state) => state,
  );
  const handleClose = () => {
    setExplore(false);
  };
  return (
    <div className={`transition-all duration-500 w-full md:py-2`}>
      {isDataLoaded && (
        <>
          <div className='flex items-center justify-between uppercase pl-3 pr-2 font-medium md:py-2 border-b border-primary'>
            <span>bars</span>
            {isMobile && (
              <button
                className=' hover:cursor-pointer'
                onClick={handleClose}>
                <IoCloseOutline size={24} />
              </button>
            )}
          </div>
          {!bars?.length && (
            <div className='flex flex-col items-center justify-center px-4 pt-4 h-48 '>
              <LuBeerOff
                className='text-slate-200'
                size={32}
              />
              <span className='block text-sm text-center'>
                <span className='text-lg font-medium'>Sorry!</span>
                <br /> No bars available in{' '}
                {hood ? hood.name : 'this neighborhood'}.
              </span>
            </div>
          )}
          {bars &&
            // @ts-ignore
            bars.map(({ id, igWidgetId, ...props }) => (
              // @ts-ignore
              <BarSideItem
                key={id}
                id={id}
                igWidgetId={igWidgetId}
                {...props}>
                <ElfsightWidget
                  className='px-4 py-4'
                  lazy
                  widgetId={igWidgetId}
                />
              </BarSideItem>
            ))}
        </>
      )}
    </div>
  );
}
