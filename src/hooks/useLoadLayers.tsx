import { useEffect } from 'react';
import useMapStore from '../data/mapStore';
import { Bars, DataSets, Hoods } from '../utils/store.types';

const datasets: [keyof DataSets, string][] = [
  [
    'hoods',
    'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville-neighbourhoods-custom.geojson',
  ],
  [
    'bars',
    'https://raw.githubusercontent.com/Auh3b/nashville-map-data/refs/heads/main/nashville-bars-data.geojson',
  ],
];

export default function useLoadLayers() {
  const { setDataset, setDataLoaded } = useMapStore((state) => state);

  useEffect(() => {
    Promise.all(datasets.map(([_id, url]) => fetch(url)))
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then((data) => {
        data.forEach((d: Bars | Hoods, i) => setDataset(datasets[i][0], d));
        setDataLoaded();
      });
  }, []);
  return;
}
