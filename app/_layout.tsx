import { COLOR } from "@/constants";
import useInitLanguage from "@/hooks/useInitLanguage";
import { I18N_MESSAGE } from "@/i18n";
import { useLanguageStore } from "@/store";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import useJWTExpiryWatcher from "../hooks/useJWTExpiryWatcher";

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const language = useLanguageStore((state) => state.language);

  useJWTExpiryWatcher();
  useInitLanguage();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: isDark ? COLOR.DARK.GRAY[900] : COLOR.LIGHT.GRAY[900],
        headerStyle: {
          backgroundColor: isDark ? COLOR.DARK.GRAY[100] : COLOR.LIGHT.GRAY[100],
        },
      }}
    >
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
          headerTitle: I18N_MESSAGE["LOGIN"][language ?? "en-US"],
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
