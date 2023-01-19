import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  openLoginModal: boolean;
  setOpenLoginModal: (openLoginModal: boolean) => void;
  authLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
  editProfile: boolean;
  setEditProfile: (state: boolean) => void;
}

const useStoreNoPersist = create<Store>()(
  devtools((set) => ({
    authLoading: false,
    setAuthLoading: (loading) => set({ authLoading: loading }),
    openLoginModal: false,
    setOpenLoginModal: (openLoginModal) => set({ openLoginModal }),
    editProfile: false,
    setEditProfile: (editProfile: boolean) => {
      return set((state) => ({ ...state, editProfile }));
    },
  }))
);

export default useStoreNoPersist;
