import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

export default function RequiredLoginCallout() {
  const router = useRouter();

  return (
    <View style={styles.infomationWrapper}>
      <ThemedText style={styles.infomation}>로그인이 필요합니다.</ThemedText>
      <Button title="로그인" onPress={() => router.push("/login")} />
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
