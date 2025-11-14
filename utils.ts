import * as SecureStore from "expo-secure-store";

export function getPayloadFromJWT<T = Record<string, unknown>>(token: string) {
  const [, payload] = token.split(".");
  const decodedPaylaod = JSON.parse(window.atob(payload)) as T;
  return decodedPaylaod
}

export function tokenExpiryChecker(token: string, now: number) {
  const decodedPaylaod = getPayloadFromJWT(token)

  if (decodedPaylaod.hasOwnProperty("exp")) {
    const exp = decodedPaylaod.exp as number;
    return now / 1000 < exp;
  }

  return false;
}

export const secureStorage = {
  getItem: async (name: string) => {
    const value = await SecureStore.getItemAsync(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};