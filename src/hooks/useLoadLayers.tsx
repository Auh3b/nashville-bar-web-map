import { useEffect } from 'react';
import useMapStore from '../data/mapStore';
import layers from '../data/layers';
import { getCategoryTree } from '../utils/dtFuncs';
import { getPosts } from '../utils/wpApi';
import { postsTofeatureCollection } from '../utils/geoFuncs';
const interactiveLayerIds = Object.values(layers);

export default function useLoadLayers() {
  const {
    data,
    setDataset,
    setInteractiveLayerIds,
    setDataLoaded,
    setCategories,
  } = useMapStore((state) => state);

  useEffect(() => {
    getPosts('map_spot')
      .then((data) => {
        return postsTofeatureCollection(data);
      })
      .then((data) => {
        // @ts-ignore
        setDataset('bars', data);
        setCategories(
          // @ts-ignore
          getCategoryTree(data.features.map(({ properties }) => properties)),
        );
      });
  }, []);

  useEffect(() => {
    getPosts('map_neighborhood')
      .then((data) => {
        return postsTofeatureCollection(data);
      })
      // @ts-ignore
      .then((data) => setDataset('hoods', data));
  }, []);

  useEffect(() => {
    if (data) {
      setDataLoaded();
      setInteractiveLayerIds(interactiveLayerIds);
    }
  }, [data]);

  return;
}
