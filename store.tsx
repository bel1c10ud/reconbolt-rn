import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStorage } from "./utils";

interface AuthStore {
  accessToken: null | string;
  setAccessToken: (accessToken: null | string) => void;
  idToken: null | string;
  setIdToken: (idToken: null | string) => void;
}


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken: null | string) => set({ accessToken }),
      idToken: null,
      setIdToken: (idToken: null | string) => set({ idToken }),
    }),
    {
      name: "reconbolt-rn-store", // SecureStore Key
      storage: createJSONStorage(() => secureStorage),
    }
  )
);