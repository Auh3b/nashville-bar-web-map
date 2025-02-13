import { bars } from '../../data/database';
import { BarInfoUIProps } from '../../utils/component.types';
import BarSideItem from './BarSideItem';

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
          onExpand={onExpand}
        />
      ))}
    </div>
  );
}
