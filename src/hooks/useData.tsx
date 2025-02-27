import { useMemo } from 'react';
import useMapStore from '../data/mapStore';
import { DataSets } from '../utils/store.types';

const useData = (id: keyof DataSets) => {
  const { data: datasets, hood } = useMapStore((state) => state);

  const data = useMemo(() => {
    if (!datasets) return;
    if (id === 'hoods') {
      return datasets.hoods;
    }

    return datasets.bars;
  }, [datasets, hood]);
  return data;
};
export default useData;
