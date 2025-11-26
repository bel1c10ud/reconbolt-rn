import { COLOR } from "@/constants";
import { I18N_MESSAGE } from "@/i18n";
import { useAuthStore, useLanguageStore } from "@/store";
import { IdTokenPayload } from "@/types";
import { getPayloadFromJWT } from "@/utils";
import { useMemo } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import ThemedText from "./ThemedText";

export default function AcountInfomation() {
  const isDark = useColorScheme() === "dark";
  const accessToken = useAuthStore((state) => state.accessToken);
  const idToken = useAuthStore((state) => state.idToken);
  const language = useLanguageStore((state) => state.language);

  const gamename = useMemo(() => {
    if (!idToken) return;
    const payload = getPayloadFromJWT<IdTokenPayload>(idToken);
    return payload.acct?.game_name;
  }, [idToken]);

  const tagline = useMemo(() => {
    if (!idToken) return;
    const payload = getPayloadFromJWT<IdTokenPayload>(idToken);
    return payload.acct?.tag_line;
  }, [idToken]);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? COLOR.DARK.GRAY[200] : "#f2f2f2" }]}>
      <ThemedText>{I18N_MESSAGE["ACCOUNT"][language ?? "en-US"]}</ThemedText>
      {accessToken && idToken && gamename && tagline ? (
        <View style={styles.username}>
          <ThemedText style={styles.label} color={600}>
            {gamename}
          </ThemedText>
          <ThemedText style={styles.label} color={600}>
            #{tagline}
          </ThemedText>
        </View>
      ) : (
        <ThemedText style={styles.label} color={600}>
          {I18N_MESSAGE["LOGIN_IS_REQUIRED"][language ?? "en-US"]}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 24,
    borderRadius: 16,
  },
  username: {
    display: "flex",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
});
