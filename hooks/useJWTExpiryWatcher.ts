import { useAuthStore } from "@/store";
import { tokenExpiryChecker } from "@/utils";
import { useFocusEffect, usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function useJWTExpiryWatcher() {
  const pathname = usePathname();

  const [now, setNow] = useState(Date.now());

  const accessToken = useAuthStore((state) => state.accessToken);
  const idToken = useAuthStore((state) => state.idToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIdToken = useAuthStore((state) => state.setIdToken);

  const updateNow = useCallback(() => {
    setNow(Date.now());
  }, []);

  useFocusEffect(() => {
    updateNow();
  });

  useEffect(() => {
    updateNow();
  }, [pathname, updateNow]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateNow();
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, [updateNow]);

  useEffect(() => {
    if (accessToken) {
      const isAccessTokenExpired = tokenExpiryChecker(accessToken, now);
      if (!isAccessTokenExpired) {
        setAccessToken(null);
        console.log("clear access_token", now);
      }
    }

    if (idToken) {
      const isIdTokenExpired = tokenExpiryChecker(idToken, now);
      if (!isIdTokenExpired) {
        setIdToken(null);
        console.log("clear id_token", now);
      }
    }
  }, [accessToken, idToken, now, setAccessToken, setIdToken]);
}
