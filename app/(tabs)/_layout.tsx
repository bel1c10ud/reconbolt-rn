import { COLOR } from "@/constants";
import { I18N_MESSAGE } from "@/i18n";
import { useLanguageStore } from "@/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme } from "react-native";

export default function TabLayout() {
  const isDark = useColorScheme() === "dark";
  const language = useLanguageStore((state) => state.language);

  return (
    <NativeTabs
      tintColor={isDark ? COLOR.DARK.GRAY[900] : COLOR.LIGHT.GRAY[900]}
      indicatorColor={isDark ? COLOR.DARK.GRAY[200] : COLOR.LIGHT.GRAY[200]}
      backgroundColor={isDark ? COLOR.DARK.GRAY[50] : COLOR.LIGHT.GRAY[50]}
    >
      <NativeTabs.Trigger name="index">
        <Label>{I18N_MESSAGE["STORE"][language ?? "en-US"]}</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <Label>{I18N_MESSAGE["SETTING"][language ?? "en-US"]}</Label>
        {Platform.select({
          ios: <Icon sf="gear" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="settings" />} />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
