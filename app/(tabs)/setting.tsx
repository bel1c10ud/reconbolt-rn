import AcountInfomation from "@/components/AcountInfomation";
import LanguageSelector from "@/components/LanguageSelector";
import LoginButton from "@/components/LoginButton";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import ThemedText from "@/components/ThemedText";
import { I18N_MESSAGE } from "@/i18n";
import { useLanguageStore } from "@/store";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Setting() {
  const language = useLanguageStore((state) => state.language);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText style={styles.header}>{I18N_MESSAGE["SETTING"][language ?? "en-US"]}</ThemedText>
      <View style={styles.content}>
        <AcountInfomation />
        <LanguageSelector />
        <LoginButton />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 16,
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    gap: 16,
    marginTop: 18,
  },
});
