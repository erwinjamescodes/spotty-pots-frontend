import { create } from "zustand";

const useViewportStore = create((set) => ({
  longitude: 120.816,
  latitude: 14.8527,
  zoom: 12,
  setLongitude: (long) => set((state) => ({ longitude: long })),
  setLatitude: (lat) => set((state) => ({ longitude: lat })),
  setZoom: (zm) => set((state) => ({ zoom: zm })),
}));

export default useViewportStore;
