export interface NeighborhoodInfoProps {
  id: any;
  name?: string;
  description?: string;
  onExplore?: (id: any) => void;
  explore?: boolean;
}

export default function NeighborhoodInfo(props: NeighborhoodInfoProps) {
  const {
    id,
    name,
    description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae, animi neque illum nesciunt amet excepturi ab optio rerum alias.',
    onExplore,
    explore = false,
  } = props;
  const handleExplore = () => {
    if (onExplore) onExplore(id);
  };
  return (
    <div className='flex flex-col gap-4'>
      <span className='text-xs uppercase border-b border-b-slate-700 p-4'>
        {name ? name : id}
      </span>
      <span className='text-xs my-2 px-4'>{description}</span>
      <button
        className='hover:cursor-pointer border border-slate-50 self-start py-2 px-3 rounded-3xl ml-4'
        onClick={handleExplore}>
        Explore
      </button>
    </div>
  );
}
