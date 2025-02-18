import useMapStore from '../../data/mapStore';

export default function Header() {
  const hood = useMapStore((state) => state.hood);

  return (
    <div className='mb-2'>
      <p className='text-xl font-bold mb-1'>Welcome to blog</p>

      <p className='text-sm'>
        {hood
          ? `Select a bar in ${hood.name}`
          : 'Start by exploring neighbourhood'}
      </p>
    </div>
  );
}
