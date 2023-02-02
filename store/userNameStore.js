import { create } from "zustand";

const useUsernameStore = create((set) => ({
  currentUsername: null,
  userType: null,

  setCurrentUsername: (name) =>
    set(() => ({
      currentUsername: name,
    })),
  setUserType: (type) => set(() => ({ userType: type })),
}));

export default useUsernameStore;
