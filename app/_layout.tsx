import { COLOR } from "@/constants";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import useJWTExpiryWatcher from "../hooks/useJWTExpiryWatcher";

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

  useJWTExpiryWatcher();

  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      headerTintColor: isDark ? COLOR.DARK.GRAY[900] : COLOR.LIGHT.GRAY[900],
      headerStyle: {
        backgroundColor: isDark ? COLOR.DARK.GRAY[100] : COLOR.LIGHT.GRAY[100],
      },
    }}>
      <Stack.Screen
        name="detail"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: "로그인",
          presentation: "modal"
        }}
      />
    </Stack>
  );
}
