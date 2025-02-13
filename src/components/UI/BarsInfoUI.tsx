import { bars } from '../../data/database';
import { BarInfoUIProps } from '../../utils/component.types';
import BarSideItem from './BarSideItem';
import ImageContainer from '../common/ImageContainer';

const images: string[] = [
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/drew-beamer-5Jnk_Gq2_XY-unsplash@0,1x.png',
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/drew-beamer-P6b8YbIIC54-unsplash@0,1x.jpg',
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/drew-beamer-bTN-zKFy9uA-unsplash@0,1x.png',
  'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/hari-nandakumar-jnPX_eCrCOk-unsplash@0,1x.png',
];
export default function BarsInfoUI(props: BarInfoUIProps) {
  const { selectedBar, onExpand } = props;
  return (
    <div className={`transition-all duration-500 w-full`}>
      {bars.map(({ name, address, description }, i) => (
        <BarSideItem
          key={i}
          name={name}
          address={address}
          description={description}
          id={i}
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
