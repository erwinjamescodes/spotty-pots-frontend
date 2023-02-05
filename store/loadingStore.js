import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isFetchingPins: false,
  isMapLoading: true,

  setIsFetchingPins: () => set((state) => ({ isFetchingPins: false })),
  setIsMapLoading: () => set((state) => ({ isMapLoading: false })),
}));

export default useLoadingStore;
