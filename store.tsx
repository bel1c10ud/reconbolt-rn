import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LanguageCode } from "./types";
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
      name: "reconbolt-rn-auth",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

interface LanguageStore {
  isInitLanguage: boolean;
  setIsInitLanguage: (isInit: boolean) => void;
  language: null | LanguageCode;
  setLanguage: (language: null | LanguageCode) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      isInitLanguage: false,
      setIsInitLanguage: (isInitLanguage: boolean) => set({ isInitLanguage }),
      language: null,
      setLanguage: (language: null | LanguageCode) => set({ language }),
    }),
    {
      name: "reconbolt-rn-language-1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        count: state.language,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            state?.setIsInitLanguage(true);
          }
        };
      },
    }
  )
);
