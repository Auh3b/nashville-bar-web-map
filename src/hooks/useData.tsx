import { useMemo } from 'react';
import useMapStore from '../data/mapStore';
import { DataSets } from '../utils/store.types';
import {
  getFiltersFromCategories,
  processCategoryFilters,
} from '../utils/dtFuncs';

const useData = (id: keyof DataSets) => {
  const { data: datasets, eventsCategories } = useMapStore((state) => state);

  const data = useMemo(() => {
    if (!datasets) return;
    if (id === 'hoods') {
      return datasets.hoods;
    }
    const filters = getFiltersFromCategories(eventsCategories);
    const filteredBars = processCategoryFilters(datasets.bars, filters);
    return filteredBars;
  }, [datasets, eventsCategories]);
  return data;
};
export default useData;
