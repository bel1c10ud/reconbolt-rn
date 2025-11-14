import SpinnerOverlay from "@/components/SpinnerOverlay";
import ThemedView from "@/components/ThemedView";
import { LOGIN_URL, URL_WITH_TOKEN_PATTERN } from "@/constants";
import { useAuthStore } from "@/store";
import CookieManager from "@react-native-cookies/cookies";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function Login() {
  const router = useRouter();

  const webviewRef = useRef<WebView>(null);

  const [url, setUrl] = useState(LOGIN_URL);
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIdToken = useAuthStore((state) => state.setIdToken);

  useEffect(() => {
    CookieManager.clearAll(true).then(() => {
      setIsInit(true);
    });
  }, []);

  useEffect(() => {
    const match = url.match(URL_WITH_TOKEN_PATTERN);

    if (!match) return;

    if (match[1]) {
      setAccessToken(match[1]);
    }
    if (match[2]) {
      setIdToken(match[2]);
    }

    router.dismiss();
  }, [url, setAccessToken, setIdToken, router]);

  return (
    <ThemedView style={styles.container}>
      {isLoading && (
        <SpinnerOverlay />
      )}
      {isInit && (
        <WebView
          ref={webviewRef}
          style={styles.webview}
          source={{ uri: url }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={(e) => setUrl(e.url)}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent"
  }
});
