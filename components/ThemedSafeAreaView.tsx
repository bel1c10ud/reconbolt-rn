import { COLOR } from "@/constants";
import { ComponentProps } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemedSafeAreaView({style, ...props}: ComponentProps<typeof SafeAreaView>) {
  const isDark = useColorScheme() === "dark";

  return <SafeAreaView style={[{backgroundColor: isDark ? COLOR.DARK.GRAY[100] : COLOR.LIGHT.GRAY[100]}, style]} {...props}/>
}