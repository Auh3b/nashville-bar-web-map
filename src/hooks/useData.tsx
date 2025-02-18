import { useMemo } from 'react';
import useMapStore from '../data/mapStore';
import { DataSets } from '../utils/store.types';
import { featureCollection } from '@turf/turf';

const useData = (id: keyof DataSets) => {
  const { data: datasets, hood } = useMapStore((state) => state);

  const data = useMemo(() => {
    if (!datasets) return;
    if (id === 'hoods') {
      return datasets.hoods;
    }

    return featureCollection(
      datasets.bars?.features.filter(
        (bar) => bar.properties.hoodname === hood?.name,
      ),
    );
  }, [datasets, hood]);
  return data;
};
export default useData;
