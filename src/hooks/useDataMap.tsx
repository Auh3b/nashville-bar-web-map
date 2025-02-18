import { DataSets } from '../utils/store.types';
import useData from './useData';

export default function useDataMap(id: keyof DataSets) {
  const data = useData(id);

  if (data) return data.features.map(({ properties }) => properties);
}
