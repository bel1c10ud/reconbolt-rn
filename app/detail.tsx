import RequiredLoginCallout from "@/components/RequiredLoginCallout";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { hiddenHeaderAndFooterScriptString, WEB_ENDPOINT } from "@/constants";
import { useAuthStore, useLanguageStore } from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function Detail() {
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url?: string }>();

  const accessToken = useAuthStore((state) => state.accessToken);
  const idToken = useAuthStore((state) => state.idToken);
  const language = useLanguageStore((state) => state.language);

  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event: any) => {
    const obj = JSON.parse(event.nativeEvent.data);

    if (obj.type === "open-url") {
      router.push({
        pathname: "/detail",
        params: { url: obj.url },
      });
    }
  };

  return (
    <ThemedSafeAreaView style={styles.container} edges={["top"]}>
      {accessToken && isLoading && <SpinnerOverlay />}
      {accessToken ? (
        <WebView
          style={styles.webview}
          source={{
            uri: url ? `${WEB_ENDPOINT}${url}` : "about:blank",
            headers: {
              "x-access-token": accessToken,
              "x-id-token": idToken,
              "x-language": language,
            },
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onMessage={handleMessage}
          injectedJavaScript={hiddenHeaderAndFooterScriptString}
          cacheEnabled={true}
        />
      ) : (
        <RequiredLoginCallout />
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "transparent",
  },
});
