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
  interactiveLayerIds?: string[];
  hood?: HoodItem;
  hoodCenter?: number[];
  explore: boolean;
  isDataLoaded?: boolean;
  preview?: Preview;
  bar?: BarItem;
  isMobile: boolean;
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
  setExplore: (value: boolean) => void;
  reset: () => void;
  setIsMobile: (value: boolean) => void;
  setHoodCenter: (value: number[] | undefined) => void;
  setInteractiveLayerIds: (value: string[] | undefined) => void;
}

const initialState: MapStoreState = {
  cursor: '',
  preview: undefined,
  hood: undefined,
  bar: undefined,
  isMobile: false,
  explore: false,
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
  setExplore: (explore) => set({ explore }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setHoodCenter: (hoodCenter) => set({ hoodCenter }),
  setInteractiveLayerIds: (interactiveLayerIds) => set({ interactiveLayerIds }),
}));

export default useMapStore;
