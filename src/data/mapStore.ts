import { create } from 'zustand';
import {
  BarItem,
  Bars,
  DataSets,
  HoodItem,
  Hoods,
  Preview,
} from '../utils/store.types';

interface MapStoreState {
  cursor: string;
  hood?: HoodItem;
  isDataLoaded?: boolean;
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
  setDataLoaded: () => void;
  setCursor: (cursor: string) => void;

  reset: () => void;
}

const initialState: MapStoreState = {
  cursor: '',
  preview: undefined,
  hood: undefined,
  bar: undefined,
};

const useMapStore = create<MapStoreState & MapStoreActions>((set) => ({
  ...initialState,
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

  setDataLoaded: () => set({ isDataLoaded: true }),

  setDataset: (id, value) =>
    // @ts-ignore
    set((state) => ({
      data: {
        ...state.data,
        [id]: value,
      },
    })),
  reset: () => set((state) => ({ ...state, ...initialState })),
}));

export default useMapStore;
