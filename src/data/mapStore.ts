import { createStore } from 'zustand';
import { BarItem, HoodItem, Preview } from '../utils/store.types';

interface MapStoreProps {
  hood: HoodItem;
  preview: Preview;
  bar: BarItem;
}

interface MapStoreActions {
  setPreview: (id: string, value: { [k: string]: any }) => void;
  setBar: (id: keyof BarItem, value: Partial<BarItem>) => void;
  setHood: (id: keyof HoodItem, value: Partial<HoodItem>) => void;
}

const useMapStore = createStore<MapStoreProps & MapStoreActions>((set) => ({
  hood: {},
  bar: {},
  preview: {},

  setPreview: (id, value) =>
    set((state) => ({
      preview: {
        ...state.preview,
        [id]: value,
      },
    })),

  setHood: (id, value) =>
    set((state) => ({
      hood: {
        ...state.hood,
        [id]: value,
      },
    })),

  setBar: (id, value) =>
    set((state) => ({
      bar: {
        ...state.bar,
        [id]: value,
      },
    })),
}));

export default useMapStore;
