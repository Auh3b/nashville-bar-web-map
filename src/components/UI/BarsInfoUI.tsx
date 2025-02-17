import { BarInfoUIProps } from '../../utils/component.types';
import BarSideItem from './BarSideItem';
import { useEffect, useMemo, useState } from 'react';
import { ElfsightWidget } from 'react-elfsight-widget';
import { LuBeerOff } from 'react-icons/lu';

export default function BarsInfoUI(props: BarInfoUIProps) {
  const { selectedBar, onExpand, explore, preview } = props;
  const [_bars, setBars] = useState([]);
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville-bars-data.geojson',
    )
      .then((res) => res.json())
      .then((data) =>
        setBars(
          // @ts-ignore
          data.features.map(({ properties }) => properties),
        ),
      );
  }, []);

  const bars = useMemo(
    () => (_bars.length ? _bars.filter(({ hood }) => hood === explore) : []),
    [_bars, explore],
  );

  return (
    <div className={`transition-all duration-500 w-full py-2`}>
      <p className='uppercase px-2 font-medium py-2 border-b border-slate-700'>
        bars
      </p>
      {!bars.length && (
        <div className='flex flex-col gap-2 items-center justify-center px-4 pt-4 '>
          <LuBeerOff
            className='text-slate-200'
            size={32}
          />
          <span className='block text-sm text-center'>
            <span className='text-lg font-medium'>Sorry!</span>
            <br /> No bars available in {explore}.
          </span>
        </div>
      )}
      {bars.map(
        ({
          id,
          name,
          address,
          description,
          latitude,
          longitude,
          igWidgetId,
        }) => (
          <BarSideItem
            key={id}
            name={name}
            address={address}
            description={description}
            latitude={latitude}
            longitude={longitude}
            id={id}
            selected={preview?.bar ? preview.bar : selectedBar}
            onExpand={onExpand}>
            <ElfsightWidget
              className='px-4 pb-4'
              lazy
              widgetId={igWidgetId}
            />
          </BarSideItem>
        ),
      )}
    </div>
  );
}
