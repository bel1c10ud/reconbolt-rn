import RequiredLoginCallout from "@/components/RequiredLoginCallout";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { hiddenHeaderAndFooterScriptString, WEB_ENDPOINT } from "@/constants";
import { useAuthStore, useLanguageStore } from "@/store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function Store() {
  const router = useRouter();

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
            uri: `${WEB_ENDPOINT}/store`,
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
    backgroundColor: "transparent",
  },
});
