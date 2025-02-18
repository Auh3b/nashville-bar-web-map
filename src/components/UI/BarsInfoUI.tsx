import BarSideItem from './BarSideItem';
import { ElfsightWidget } from 'react-elfsight-widget';
import { LuBeerOff } from 'react-icons/lu';
import useDataMap from '../../hooks/useDataMap';
import useMapStore from '../../data/mapStore';

export default function BarsInfoUI() {
  const bars = useDataMap('bars');
  const hood = useMapStore((state) => state.hood);

  return (
    <div className={`transition-all duration-500 w-full py-2`}>
      <p className='uppercase px-2 font-medium py-2 border-b border-slate-700'>
        bars
      </p>
      {!bars && (
        <div className='flex flex-col items-center justify-center px-4 pt-4 h-48 '>
          <LuBeerOff
            className='text-slate-200'
            size={32}
          />
          <span className='block text-sm text-center'>
            <span className='text-lg font-medium'>Sorry!</span>
            <br /> No bars available in {hood ? hood.name : 'this neighborhood'}
            .
          </span>
        </div>
      )}
      {bars &&
        bars.map(({ id, igWidgetId, ...props }) => (
          <BarSideItem
            key={id}
            id={id}
            igWidgetId={igWidgetId}
            {...props}>
            <ElfsightWidget
              className='px-4 pb-4'
              lazy
              widgetId={igWidgetId}
            />
          </BarSideItem>
        ))}
    </div>
  );
}
