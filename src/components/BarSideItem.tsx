import { useCallback } from 'react';

interface BarSideItemProps {
  id: any;
  name: string;
  address: string;
  description: string;
  selected: any;
  onExpand: (value: any) => void;
}

export default function BarSideItem(props: BarSideItemProps) {
  const { id, name, address, description, selected, onExpand } = props;

  const open = selected == id;
  const handleClick = useCallback(() => {
    if (open) {
      onExpand(null);
    } else {
      onExpand(id);
    }
  }, [selected, open]);

  return (
    <div className='flex flex-col'>
      <div
        className='flex items-center justify-between  p-3 border-b border-gray-50 cursor-pointer'
        onClick={handleClick}>
        <span className='text-sm uppercase'>{name}</span>
        <span>{open ? '⏸️' : '▶️'}</span>
      </div>
      <>
        {open && (
          <>
            <div className='mb-4 p-4 text-sm'>📌{address}</div>
            <div className='p-4'>{description}</div>
          </>
        )}
      </>
    </div>
  );
}
