import { create } from "zustand";

const useFilterStore = create((set) => ({
  intensityFilter: 0,
  statusFilter: [],
  submissionFilter: false,

  setIntensityFilter: (intensity) =>
    set(() => ({
      intensityFilter: intensity,
    })),

  setStatusFilter: (status) =>
    set((state) => ({ statusFilter: [...state.statusFilter, status] })),
  removeStatusFilter: (status) =>
    set((state) => ({
      statusFilter: state.statusFilter.filter((stat) => stat !== status),
    })),
  resetStatusFilter: () => {
    set(() => ({ statusFilter: [] }));
  },

  setSubmissionFilter: () =>
    set((state) => ({ submissionFilter: !state.submissionFilter })),
  resetSubmissionFilter: () => {
    set(() => ({ submissionFilter: false }));
  },
}));

export default useFilterStore;
