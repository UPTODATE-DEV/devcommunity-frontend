import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  authLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
}

const useStoreNoPersist = create<Store>()(
  devtools((set) => ({
    authLoading: false,
    setAuthLoading: (loading) => set({ authLoading: loading }),
  }))
);

export default useStoreNoPersist;
