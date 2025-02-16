import { BarInfoUIProps } from '../../utils/component.types';
import BarSideItem from './BarSideItem';
import ImageContainer from '../common/ImageContainer';
import { useEffect, useMemo, useState } from 'react';

const images: string[] = [
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/drew-beamer-5Jnk_Gq2_XY-unsplash@0,1x.png',
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/drew-beamer-P6b8YbIIC54-unsplash@0,1x.jpg',
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/drew-beamer-bTN-zKFy9uA-unsplash@0,1x.png',
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/hari-nandakumar-jnPX_eCrCOk-unsplash@0,1x.png',
];

export default function BarsInfoUI(props: BarInfoUIProps) {
  const { selectedBar, onExpand, explore } = props;
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
      {bars.map(({ id, name, address, description, latitude, longitude }) => (
        <BarSideItem
          key={id}
          name={name}
          address={address}
          description={description}
          latitude={latitude}
          longitude={longitude}
          id={id}
          selected={selectedBar}
          onExpand={onExpand}>
          <div className='px-4'>
            {images.map((d) => (
              <ImageContainer
                key={d}
                url={d}
              />
            ))}
          </div>
        </BarSideItem>
      ))}
    </div>
  );
}
