import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import ThemedText from "@/components/ThemedText";
import UserInfomation from "@/components/UserInfomation";
import { useAuthStore } from "@/store";
import CookieManager from "@react-native-cookies/cookies";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

export default function Setting() {
  const router = useRouter();

  const accessToken = useAuthStore((state) => state.accessToken);

  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        style: "cancel",
        text: "아니오",
      },
      {
        style: "destructive",
        text: "예",
        onPress: async () => {
          const isSuccess = await CookieManager.clearAll(true);
          useAuthStore.setState({ accessToken: null, idToken: null });
          if (isSuccess) {
            Alert.alert("로그아웃 성공", "로그아웃에 성공했습니다.", [{
              style: 'default',
              text: '확인' 
            }]);
          }
        },
      },
    ]);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText style={styles.header}>설정</ThemedText>



      <View style={styles.content}>
        <UserInfomation />

        {accessToken ? (
        <Button title="로그아웃" onPress={handleLogout} />
      ) : (
        <Button title="로그인" onPress={() => router.push("/login")} />
      )}
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
    fontWeight: "bold"
  },
  content: {
    flex:1,
    gap: 16,
    marginTop: 18
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
  }
})
