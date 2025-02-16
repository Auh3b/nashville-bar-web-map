interface LegendUIProps {
  items: string[];
  onToggle: (value: any) => void;
}

const legendItems = {
  'neighbourhood-layer': {
    id: 'neighbourhood-layer',
    name: 'Neighbourhood Poly',
    color: '#9b3f69',
  },
  'bars-layer': {
    id: 'bars-layer',
    name: 'Bars',
    color: '#e6bb32',
  },
};

export default function LegendUI(props: LegendUIProps) {
  const { items, onToggle } = props;
  const handleToggle = (value: string) => () => onToggle(value);
  return (
    <div className='absolute bottom-4 right-4 flex flex-col text-sm bg-slate-950 text-white rounded-xl pb-2'>
      <span className='font-medium px-4 py-2 border-b border-b-slate-600'>
        Legend
      </span>
      {Object.values(legendItems).map(({ id, name, color }) => (
        <div
          key={name}
          onClick={handleToggle(id)}
          className={`px-4 flex items-center gap-2 hover:cursor-pointer hover:bg-slate-700 py-2 ${
            items.includes(id) ? 'opacity-100' : 'opacity-50'
          }`}>
          <div
            className='w-3 h-3'
            style={{ backgroundColor: color }}></div>
          <span className=''>{name}</span>
        </div>
      ))}
    </div>
  );
}
