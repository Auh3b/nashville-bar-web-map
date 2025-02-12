interface LegendUIProps {
  items: string[];
  onToggle: (value: any) => void;
}

const legendItems = {
  'neighbourhood-layer': {
    id: 'neighbourhood-layer',
    name: 'Neighbourhood Poly',
    color: '#23a667',
  },
  'neighbourhood-point-id': {
    id: 'neighbourhood-point-id',
    name: 'Neighbourhood Circle',
    color: '#4b75f2',
  },
  'zipcode-layer': {
    id: 'zipcode-layer',
    name: 'Zipcode Poly',
    color: '#f5c064',
  },
};

export default function LegendUI(props: LegendUIProps) {
  const { items, onToggle } = props;
  const handleToggle = (value: string) => () => onToggle(value);
  return (
    <div className='absolute bottom-4 right-4 p-4 flex flex-col gap-4 text-sm bg-slate-950 text-white rounded-xl'>
      <span className='font-medium'>Legend</span>
      {Object.values(legendItems).map(({ id, name, color }) => (
        <div
          key={name}
          onClick={handleToggle(id)}
          className={`flex items-center gap-2 hover:cursor-pointer ${
            items.includes(id) ? 'opacity-100' : 'opacity-50'
          }`}>
          <div
            className='w-2 h-2'
            style={{ backgroundColor: color }}></div>
          <span className=''>{name}</span>
        </div>
      ))}
    </div>
  );
}
