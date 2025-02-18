import { create } from 'zustand';
import {
  BarItem,
  Bars,
  DataSets,
  HoodItem,
  Hoods,
  Preview,
} from '../utils/store.types';

interface MapStoreProps {
  cursor: string;
  hood?: HoodItem;
  preview?: Preview;
  bar?: BarItem;
  data?: DataSets;
}

interface MapStoreActions {
  setPreview: (
    id: keyof Preview,
    value: { [k: string]: any } | undefined,
  ) => void;
  setBar: (value: BarItem | undefined) => void;
  setHood: (value: HoodItem | undefined) => void;
  setDataset: (id: keyof DataSets, value: Bars | Hoods) => void;
  setCursor: (cursor: string) => void;
}

const useMapStore = create<MapStoreProps & MapStoreActions>((set) => ({
  cursor: '',
  setCursor: (cursor) => set({ cursor }),
  setPreview: (id, value) =>
    set((state) => ({
      preview: {
        ...state.preview,
        [id]: value,
      },
    })),

  setHood: (value) =>
    set({
      hood: value,
    }),

  setBar: (value) =>
    set({
      bar: value,
    }),

  setDataset: (id, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [id]: value,
      },
    })),
}));

export default useMapStore;
