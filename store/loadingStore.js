import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isFetchingPins: false,
  setIsFetchingPins: (bool) => set((state) => ({ isFetchingPins: bool })),
}));

export default useLoadingStore;
