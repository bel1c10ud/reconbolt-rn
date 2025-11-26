import { I18N_MESSAGE } from "@/i18n";
import { useLanguageStore } from "@/store";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

export default function RequiredLoginCallout() {
  const router = useRouter();
  const laguage = useLanguageStore((state) => state.language);

  return (
    <View style={styles.infomationWrapper}>
      <ThemedText style={styles.infomation}>{I18N_MESSAGE["LOGIN_IS_REQUIRED"][laguage ?? "en-US"]}</ThemedText>
      <Button title={I18N_MESSAGE["LOGIN"][laguage ?? "en-US"]} onPress={() => router.push("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  infomationWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  infomation: {
    fontSize: 18,
  },
});
