import { COLOR } from "@/constants";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme } from "react-native";

export default function TabLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <NativeTabs
      tintColor={isDark ? COLOR.DARK.GRAY[900] : COLOR.LIGHT.GRAY[900]}
      indicatorColor={isDark ? COLOR.DARK.GRAY[200] : COLOR.LIGHT.GRAY[200]}
      backgroundColor={isDark ? COLOR.DARK.GRAY[50] : COLOR.LIGHT.GRAY[50]}
      
    >
      <NativeTabs.Trigger name="index">
        <Label>상점</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <Label>설정</Label>
        {Platform.select({
          ios: <Icon sf="gear" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="settings" />} />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
