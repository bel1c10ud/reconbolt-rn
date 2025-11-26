import { COLOR, LANGUAGES } from "@/constants";
import { I18N_MESSAGE } from "@/i18n";
import { useLanguageStore } from "@/store";
import { MenuView } from "@react-native-menu/menu";
import { useMemo } from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import ThemedText from "./ThemedText";

export default function LanguageSelector() {
  const isDark = useColorScheme() === "dark";
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const languageOption = useMemo(() => LANGUAGES.find((lang) => lang.code === language), [language]);

  return (
    <MenuView
      title={I18N_MESSAGE["LANGUAGE"][language ?? "en-US"]}
      onPressAction={({ nativeEvent }) => {
        const findLanguageOption = LANGUAGES.find((lang) => lang.code === nativeEvent.event);

        if (findLanguageOption) {
          setLanguage(findLanguageOption.code);
        }
      }}
      actions={LANGUAGES.map((lang) => ({
        id: lang.code,
        title: lang.name,
        preferredElementSize: "large",
      }))}
    >
      <Pressable style={[styles.container, { backgroundColor: isDark ? COLOR.DARK.GRAY[200] : "#f2f2f2" }]}>
        <ThemedText>{I18N_MESSAGE["LANGUAGE"][language ?? "en-US"]}</ThemedText>
        <View style={styles.content}>
          {language ? (
            <View style={styles.labelWrapper}>
              <ThemedText style={styles.label} color={700}>
                {languageOption?.name}
              </ThemedText>
              {languageOption?.altName && (
                <ThemedText style={styles.label} color={700}>
                  - {languageOption?.altName}
                </ThemedText>
              )}
            </View>
          ) : (
            <ThemedText style={styles.label} color={500}>
              {I18N_MESSAGE["LANGUAGE"][language ?? "en-US"]}
            </ThemedText>
          )}
        </View>
      </Pressable>
    </MenuView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 24,
    borderRadius: 16,
  },
  labelWrapper: {
    flexDirection: "row",
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
