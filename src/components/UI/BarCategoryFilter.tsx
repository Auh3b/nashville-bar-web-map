import { ChangeEvent, useCallback, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa6';
import useMapStore from '../../data/mapStore';
import { Categories } from '../../utils/store.types';
import { ascending } from 'd3-array';

export default function BarCategoryFilter() {
  const { explore, isMobile, eventsCategories, updateCategories } =
    useMapStore();

  const transition = useTransition(explore, {
    from: { opacity: 0, transform: `translateX(-50px)` },
    enter: { opacity: 1, transform: `translateX(0px)` },
    leave: { opacity: 0, transform: `translateX(-50px)` },
    exitBeforeEnter: true,
  });

  return (
    <>
      {transition((style, i) => {
        return i && !isMobile ? (
          <animated.div
            key={`category_group_${i}`}
            className='card-container container-dark absolute top-4 left-4 min-w-44'
            style={style}>
            <span className='block border-b border-primary px-4 py-2 font-medium text-sm uppercase'>
              Categories
            </span>
            {eventsCategories &&
              Object.values(eventsCategories)
                .sort((a, b) => ascending(a.label, b.label))
                .map((d) => (
                  <CategoryItem
                    {...d}
                    onCheckChange={updateCategories}
                    key={d.value}
                  />
                ))}
          </animated.div>
        ) : (
          <></>
        );
      })}
    </>
  );
}

interface CategoryItemProps {
  label: string;
  value: string;
  checked: boolean;
  parent?: string;
  subs?: Categories;
  disabled?: boolean;
  onCheckChange: (checked: boolean, id: string, parent?: string) => void;
}

function CategoryItem(props: CategoryItemProps) {
  const {
    label,
    value,
    checked,
    subs,
    onCheckChange,
    parent,
    disabled = false,
  } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      onCheckChange(checked, value, parent);
    },
    [value, parent],
  );
  return (
    <div className='py-1'>
      <div className='flex items-center'>
        <button
          className={` px-2 hover:cursor-pointer ${!subs && 'text-gray-50/0'}`}
          disabled={!subs}
          onClick={handleOpen}>
          {open ? <FaAngleDown /> : <FaAngleRight />}
        </button>
        <div className='flex gap-2 items-center justify-between grow'>
          <span>{label}</span>
          <div className='pr-4 flex place-content-center'>
            <input
              className='accent-[var(--secondary-color)]'
              type={'checkbox'}
              disabled={disabled}
              checked={checked}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={` ${open ? 'h-full' : 'h-0 overflow-hidden'} ml-3`}>
        {subs &&
          Object.values(subs).map((d) => (
            <CategoryItem
              {...d}
              onCheckChange={onCheckChange}
              parent={value}
              disabled={!checked}
              key={d.value}
            />
          ))}
      </div>
    </div>
  );
}
