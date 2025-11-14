import { COLOR } from "@/constants";
import { useAuthStore } from "@/store";
import { IdTokenPayload } from "@/types";
import { getPayloadFromJWT } from "@/utils";
import { useMemo } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import ThemedText from "./ThemedText";

export default function UserInfomation() {
  const isDark = useColorScheme() === "dark";

  const accessToken = useAuthStore((state) => state.accessToken);
  const idToken = useAuthStore((state) => state.idToken);

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
      {accessToken && idToken && gamename && tagline ? (
        <>
          <ThemedText style={styles.label} color={600}>{gamename}</ThemedText>
          <ThemedText style={styles.label} color={600}>#{tagline}</ThemedText>
        </>
      ) : (
        <ThemedText style={styles.label} color={600}>로그인이 필요합니다.</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    display: "flex", 
    flexDirection: "row", 
    padding: 24, 
    borderRadius: 16, 
  },
  label: { 
    fontSize: 16, 
    fontWeight: "500",
  },
});
